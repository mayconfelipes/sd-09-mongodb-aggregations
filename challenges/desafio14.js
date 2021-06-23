db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaMs: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $sort: { duracaoMediaMs: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$duracaoMediaMs", 60000] } },
    },
  },
]);
