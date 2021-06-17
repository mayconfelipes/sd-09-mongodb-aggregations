db.trips.aggregate([
  {
    $addFields: {
      duracao_viagens: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media_duracao_viagens: { $avg: "$duracao_viagens" },
    },
  },
  {
    $sort: { media_duracao_viagens: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$media_duracao_viagens" },
    },
  },
]);
