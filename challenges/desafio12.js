db.trips.aggregate([
  {
    $addFields: {
      weekDay: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      weekDay: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: {
        $sum: 1,
      },
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
      _id: false,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
]);
