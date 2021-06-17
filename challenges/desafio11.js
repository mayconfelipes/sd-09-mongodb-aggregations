db.trips.aggregate([
  {
    $project: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      qtd: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: { $max: "$_id" },
      total: "$qtd",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
], { allowDiskUse: true });
