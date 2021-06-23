db.trips.aggregate([
  {
    $addFields: {
      weekDay: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      weekDay: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      trips: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$trips",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
