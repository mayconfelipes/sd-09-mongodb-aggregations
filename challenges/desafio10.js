db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      tripAvgTime: {
        $avg: {
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: [
              "$tripAvgTime",
              60 * 60 * 1000,
            ],
          },
          2,
        ],
      },
    },
  },
]);
