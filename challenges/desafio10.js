db.trips.aggregate([
  {
    $project: {
      usertype: 1,
      timeDiff: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$timeDiff",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 3600 * 1000] }, 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
