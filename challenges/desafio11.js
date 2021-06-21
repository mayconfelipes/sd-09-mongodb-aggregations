db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      numeroViagens: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
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
      diaDaSemana: 1,
      total: "$numeroViagens",
    },
  },
]);
