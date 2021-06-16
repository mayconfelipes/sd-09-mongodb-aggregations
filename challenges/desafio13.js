// use('aggregations');
db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lt: ISODate("2016-03-10T23:59:59Z") },
  } },

  { $addFields: {
    // tempo em minutos -> 60min * 1000milisec = 60000
    duracaoMinutos: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
  } },

  { $group: {
    _id: null,
    duracaoTotalMinutos: { $sum: "$duracaoMinutos" },
    total: { $sum: 1 },
  } },

  { $project: {
    _id: 0,
    duracaoMediaMinutos: {
      $round: [{ $avg: { $divide: ["$duracaoTotalMinutos", "$total"] } }] },
  } },
]);
