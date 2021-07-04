db.trips.aggregate([
  {
    $project: {
      _id: 0,
      diaDoAno: {
        $dateToString: {
          format: "%d%m%G",
          date: "$startTime",
        },
      },
      time: {
        $subtract: [
          "$stopTime", "$startTime",
        ],
      },
    },
  },
  {
    $match: {
      diaDoAno: "10032016",
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$time",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: [
            "$duracaoMediaEmMinutos",
            60000,
          ],
        },
      },
    },
  },
]);
