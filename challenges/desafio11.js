db.trips.aggregate([
  {
    $addFields: {
      weekDay: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$weekDay",
      total: {
        $sum: 1,
      },
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
  {
    $limit: 1,
  },
]);
