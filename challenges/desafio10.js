db.trips.aggregate([
  {
    $project: {
      tipo: "$usertype",
      duration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          3600000,
        ] },
    },
  },
  {
    $group: {
      _id: "$tipo",
      duracaoMedia: { $avg: "$duration" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
