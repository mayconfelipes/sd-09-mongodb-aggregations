db.trips.aggregate([
  {
    $project: {
      stopTime: 1,
      startTime: 1,
      day: { $dayOfMonth: "$startTime" },
      month: { $month: "$startTime" },
      year: { $year: "$startTime" },
    },
  },
  {
    $match: {
      day: 10,
      month: 3,
      year: 2016,
    },
  },
  {
    $project: {
      duration: {
        $divide: [
          {
            $subtract: [
              "$stopTime",
              "$startTime",
            ],
          },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duration" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $round: ["$duracaoMediaEmMinutos"],
      },
    },
  },
]);
