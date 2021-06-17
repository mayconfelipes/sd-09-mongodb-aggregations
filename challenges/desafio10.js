db.trips.aggregate([
  { $addFields: { durationTrip: { $divide: [
    { $subtract: ["$stopTime", "$startTime"] },
    3600000,
  ] } } },
  { $group: { _id: "$usertype", diferencaHrs: { $avg: "$durationTrip" } } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: ["$diferencaHrs", 2] }, _id: 0 } },
]);
