use("aggregations");
db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      diaDaSemana: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);
