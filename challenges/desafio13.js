db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10T00:00:00.000Z"), $lt: ISODate("2016-03-11T00:00:00.000Z") } } },
  { $group: { _id: null, time: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { duracaoMediaEmMinutos: { $ceil: { $divide: ["$time", 60000] } }, _id: 0 } },
]);
