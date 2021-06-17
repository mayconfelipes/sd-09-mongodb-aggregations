db.trips.aggregate([
  {
    $project:
    {
      stopTime: 1,
      startTime: 1,
      trip_day: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
      trip_duration: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $match:
    {
      trip_day: "2016-03-10",
    },
  },
  {
    $group:
    {
      _id: "$trip_day",
      avg_trip_duration:
      {
        $avg: { $divide: ["$trip_duration", 60000] },
      },
    },
  },
  {
    $project:
    {
      _id: 0,
      duracaoMediaEmMinutos: { $round: "$avg_trip_duration" },
    },
  },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/
// Usei a documentação para aprender sobre o operador $dateToString
// e conseguir retirar somente a data das viagens e a partir daí
// fazer o $match para filtar a data desejada.
