db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gte: ISODate("2016-03-10T00:00:00.000Z") } },
        { startTime: { $lte: ISODate("2016-03-10T23:59:50.000Z") } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] }, 60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
      _id: 0,
    },
  },
]);
