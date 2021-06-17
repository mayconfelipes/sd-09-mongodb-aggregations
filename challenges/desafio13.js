db.trips.aggregate([
  {
    $match: {
      startTime: { $lt: ISODate("2016-03-11T00:00:00Z"), $gte: ISODate("2016-03-10T00:00:00Z") },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $project: { duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] } },
  },
]);
