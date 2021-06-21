db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $subtract: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeid: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 60 * 60 * 1000] }, 2],
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
