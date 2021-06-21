db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        estacao: "$startStationName",
      },
      numeroViagens: { $sum: 1 },
    },
  },
  {
    $project: {
      numeroViagens: 1,
    },
  },
  {
    $sort: {
      numeroViagens: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.estacao",
      total: "$numeroViagens",
    },
  },
]);
