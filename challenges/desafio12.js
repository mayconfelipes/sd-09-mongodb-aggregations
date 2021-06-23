db.trips.aggregate([
  {
    $group: {
      _id: { day: { $dayOfWeek: "$startTime" }, nomeEstacao: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $project: { _id: 0, nomeEstacao: "$_id.nomeEstacao", total: "$total" } },
  { $limit: 1 },
]);
