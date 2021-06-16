// use('aggregations');
db.trips.aggregate([
  { $addFields: {
    // tempo em minutos -> 60min * 1000milisec = 60000
    duracaoMinutos: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
  } },

  { $group: {
    _id: "$bikeid",
    duracaoTotalMinutos: { $sum: "$duracaoMinutos" },
    total: { $sum: 1 },

    // usando AVG
    // TESTEavg: { $avg: "$duracaoMinutos" }
  } },

  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: [{ $divide: ["$duracaoTotalMinutos", "$total"] }] },

    // duracaoMedia1: { $ceil: "$TESTEavg" }
  } },

  { $sort: { duracaoMedia: -1 } },

  { $limit: 5 },

]);
