db.trips.aggregate([
  {
    $addFields: {
      subtractTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avarageMilliseconds: { $avg: "$subtractTime" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$avarageMilliseconds", 3600000] }, 2] },
    },
  },
]);
