db.trips.aggregate([
  {
    $project: {
      _id: 0,
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
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
      _id: 0,
      total: 1,
      diaDaSemana: "$_id",
    },
  },
]);
