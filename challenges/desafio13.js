db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          { $dateToString: { date: "$startTime", format: "%Y-%m-%d" } },
          "2016-03-10",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
