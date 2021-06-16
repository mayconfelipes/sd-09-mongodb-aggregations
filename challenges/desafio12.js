db.trips.aggregate([
  { $group: {
    _id: {
      startDay: { $dayOfWeek: "$startTime" },
      station: "$startStationName",
    },
    total: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.station",
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
