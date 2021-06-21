db.trips.aggregate([
  {
    $project: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      estacao: "$startStationName",
    },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$diaDaSemana",
        estacao: "$estacao",
      },
      qtd: { $sum: 1 },
    },
  },
  {
    $project: {
      estacao: "$_id.estacao",
      total: "$qtd",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
], { allowDiskUse: true });
