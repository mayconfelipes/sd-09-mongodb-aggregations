db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new Date("2016-03-10T03:00:00Z") },
    },
  },
  {
    $group: {
      _id: null,
      deltaTempo: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$deltaTempo", 1000 * 60],
        },
      },
    },
  },
]);
