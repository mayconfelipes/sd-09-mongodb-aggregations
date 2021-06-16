db.trips.aggregate([
  {
    $project: {
      startDayWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$startDayWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: 1,
    },
  },
]);
