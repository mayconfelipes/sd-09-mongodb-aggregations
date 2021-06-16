db.trips.aggregate(
  [
    {
      $addFields: {
        diaDaSemana: {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group: {
        _id: { estacao: "$startStationName", diaDaSemana: "$diaDaSemana" },
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
        nomeEstacao: "$_id.estacao",
        total: "$total",
      },
    },
  ],
);
