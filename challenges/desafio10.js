// Fonte calculo datas: https://nodejs.docow.com/9472/como-subtrair-duas-datas-no-mongodb.html
// totalHourSpent:{$divide : [{$subtract: ["$lastSeen","$firstSeen"]}, 360000]}

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime",
        "$startTime"] }, 3600000] } },
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
