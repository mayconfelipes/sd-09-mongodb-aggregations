db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, total: { $sum: 1 } } },
  { $limit: 1 },
]);
