db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
