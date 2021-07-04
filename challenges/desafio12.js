db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      total: { $sum: 1 },
      startStations: { $push: "$startStationName" },
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
    $unwind: "$startStations",
  },
  {
    $group: {
      _id: "$startStations",
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
      nomeEstacao: "$_id",
      total: "$total",
      _id: 0,
    },
  },
]);
