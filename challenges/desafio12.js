db.trips.aggregate([
  {
    $project: {
      _id: 0,
      week: { $dayOfWeek: "$startTime" },
      start: "$startStationName",
    },
  },
  {
    $match: {
      week: 5,
    },
  },
  {
    $group: {
      _id: "$start",
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
]);
