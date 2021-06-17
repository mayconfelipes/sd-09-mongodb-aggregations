db.trips.aggregate([
  {
    $project: {
      startDayWeek: {
        $dayOfWeek: "$startTime",
      },
      startStationName: 1,
    },
  },
  {
    $group: {
      _id: {
        startStation: "$startStationName",
        weekDay: "$startDayWeek",
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
