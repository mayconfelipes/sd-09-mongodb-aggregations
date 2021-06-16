db.trips.aggregate([
  { $match: { $and: [
    { startTime: { $gte: ISODate("2016-03-10T00:00:00.000Z") } },
    { startTime: { $lte: ISODate("2016-03-10T23:59:59.999Z") } },
  ] } },
  { $group: { _id: {}, duracaoMediaEmMinutos: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 60000] } } } },
]);
