// consultado a forma para obter o resultado da duração em horas
// em: https://github.com/tryber/sd-09-mongodb-aggregations/pull/66/files
db.trips.aggregate([
  { $unwind: "$usertype" },
  { $group:
    {
      _id: "$usertype",
      duracaoMedia:
        {
          $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
        },
    },
  },
  { $sort: { duracaoMedia: 1 } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
