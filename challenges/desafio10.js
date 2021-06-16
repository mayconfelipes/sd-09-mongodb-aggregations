db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      media: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedica: {
        $round: [
          {
            $divide: ["$media", 60 * 60 * 1000],
          },
          2,
        ],
      },
    },
  },
]);
