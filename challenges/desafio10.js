db.trips.aggregate([
  {
    $addFields: {
      duracao_viagens: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 60 * 1000,
        ],

      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao_viagens" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
