// use('aggregations');
db.trips.aggregate([
  { $addFields: {
    timeDif: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
  } },

  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$timeDif" },
    totalItems: { $sum: 1 },
  } },

  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
]);
