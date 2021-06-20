db.trips.aggregate([
  {
    $addFields: {
      total: {
        $subtract: [
          "$stopTime", "$startTime",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$total",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
  {
    $project: {
      _id: false,
      bikeid: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: [
            "$duracaoMedia", 60 * 1000,
          ],
        },
      },
    },
  },
]);
