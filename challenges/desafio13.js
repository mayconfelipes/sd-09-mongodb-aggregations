db.trips.aggregate([
  {
    $addFields: {
      yearDate: { $year: "$startTime" },
      monthDate: { $month: "$startTime" },
      dayDate: { $dayOfMonth: "$startTime" },
    },
  },
  {
    $match: {
      yearDate: 2016,
      monthDate: 3,
      dayDate: 10,
    },
  },
  {
    $group: {
      _id: null,
      avgMillisecondes: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$avgMillisecondes", 60000] } },
    },
  },
]);
