db.trips.aggregate([
  {
    $match: {
      startTime: { $exists: true },
      stopTime: { $exists: true },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $addFields: {
      tipo: "$_id",
      duracaoMedia: { $divide: ["$media", 3600000] },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: 1,
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
