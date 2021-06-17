db.trips.aggregate([
  {
    $project: {
      _id: null,
      tipo: "$usertype",
      duracaoMedia: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$tipo",
      duracaoMedia: { $avg: "$duracaoMedia" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
    },
  },
]);
