db.trips.aggregate([
  {
    $match: {
      startTime: { $lt: ISODate("2016-03-11T00:00:00Z"), $gte: ISODate("2016-03-10T00:00:00Z") },
    },
  },
  {
    $addFields: {
      tripLength: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      lengthAverage: { $avg: "$tripLength" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$lengthAverage" },
    },
  },
]);
