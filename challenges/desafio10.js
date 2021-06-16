db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      count: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$count", 60 * 60 * 1000] }, 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
