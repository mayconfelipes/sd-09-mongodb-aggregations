db.trips.aggregate([
  {
    $project: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      nomeEstacao: "$startStationName",
    },
  },
  {
    $group: {
      _id: { diaDaSemana: "$diaDaSemana", nomeEstacao: "$nomeEstacao" }, total: { $sum: 1 },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
      _id: 0,
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
