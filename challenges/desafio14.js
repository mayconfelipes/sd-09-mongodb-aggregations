db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lt: ISODate("2016-03-10T23:59:59Z") },
    },
  },
  {
    $group: {
      _id: {
        duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
        bikeId: "$bikeId",
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id.bikeId",
      duracaoMedia: { $ceil: { $divide: ["$_id.duracaoMedia", 60000] } },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
