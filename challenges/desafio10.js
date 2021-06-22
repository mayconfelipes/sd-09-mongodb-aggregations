db.trips.aggregate([
  {
    $addFields: {
      period: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avg: { $avg: "$period" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$avg", 3600000] }, 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
