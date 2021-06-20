db.trips.aggregate([
  {
    $addFields: {
      daysOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$daysOfWeek",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
]);
