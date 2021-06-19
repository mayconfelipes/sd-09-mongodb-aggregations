db.trips.aggregate([
  { $group: { _id: { day: { $dayOfWeek: "$startTime" }, nameStation: "$startStationName" }, total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $project: { _id: false, nomeEstacao: "$_id.nameStation", total: "$total" } },
  { $limit: 1 }]);
