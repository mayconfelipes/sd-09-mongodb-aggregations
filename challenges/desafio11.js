db.trips.aggregate([
  {
    $project: {
      _id: 0,
      week: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$week",
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
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
]);
