db.trips.aggregate([
  {
    $group: {
      _id: { day: { $dayOfWeek: "$startTime" }, station: "$startStationName" },
      sum: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$sum",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
