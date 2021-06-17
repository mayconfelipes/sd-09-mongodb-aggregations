db.trips.aggregate([
  { $group: { _id: "$bikeid", time: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { bikeId: "$_id", duracaoMedia: { $ceil: { $divide: ["$time", 60000] } }, _id: 0 } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
