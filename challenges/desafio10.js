db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      average: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$average", 60 * 60 * 1000] }, 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
