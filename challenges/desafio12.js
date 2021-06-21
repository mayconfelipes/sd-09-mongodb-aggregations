db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDeInicio: { $dayOfWeek: "$startTime" },
        nomeEstac: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstac",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
