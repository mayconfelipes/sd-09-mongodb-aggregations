db.trips.aggregate([
  {
    $project: {
      _id: 0,
      diaDaSemana: { $dayOfWeek: "$startTime" },
      nomeEstacao: "$startStationName",
    },
  },
  {
    $match: { diaDaSemana: { $eq: 5 } },
  },
  {
    $group: {
      _id: "$nomeEstacao",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$count",
    },
  },
]);
