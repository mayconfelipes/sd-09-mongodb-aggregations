db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] }, 60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      bikeid: "$_id",
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
      _id: 0,
    },
  },
  {
    $sort: { duracaoMediaEmMinutos: -1 },
  },
  {
    $limit: 5,
  },
]);
