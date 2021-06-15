db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      _id: 0,
      duracaoMedia: {
        $ceil: [
          { $divide: ["$duracaoMedia", 60 * 1000] },
        ],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
