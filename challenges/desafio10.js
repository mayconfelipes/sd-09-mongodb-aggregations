db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      tempoMedio: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: ["$tempoMedio", 60 * 60000],
          },
          2,
        ],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
