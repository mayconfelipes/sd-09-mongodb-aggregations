db.trips.aggregate([
  { $addFields: { weekDays: { $dayOfWeek: "$startTime" } } },
  { $match: { weekDays: 5 } },
  { $group: { _id: "$startStationName", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { nomeEstacao: "$_id", total: "$total", _id: 0 } },
]);
