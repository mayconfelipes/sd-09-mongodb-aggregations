db.trips.aggregate([
  {
    $group: {
      _id: {
        startTime: { $dayOfWeek: "$startTime" },
        startStationName: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id.startStationName",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
