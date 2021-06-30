db.trips.aggregate([
  { $addFields:
    { duracaoMediaEmMinutos:
      { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
    },
  },
  { $group: { _id: "$bikeid", duracaoMedia: { $avg: "$duracaoMediaEmMinutos" } } },
  { $project: { bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" }, _id: 0 } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
