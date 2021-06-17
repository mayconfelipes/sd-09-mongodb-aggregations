db.trips.aggregate([
  {
    $group: {
      _id: {
        startStation: "$startStationName",
        weekDay: {
          $dayOfWeek: "$startTime",
        },
      },
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
      nomeEstacao: "$_id.startStation",
      total: 1,
    },
  },
]);
