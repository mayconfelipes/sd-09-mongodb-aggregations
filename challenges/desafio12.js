db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        estacaoInicial: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.estacaoInicial",
      total: 1,
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
  {
    $project: {
      nomeEstacao: "$nomeEstacao",
      total: "$total",
    },
  },
]);
