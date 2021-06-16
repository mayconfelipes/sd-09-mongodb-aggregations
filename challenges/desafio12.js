db.trip.aggregate([
  {},
]);

db.trips.aggregate([
  { $group: {
    _id: {
      startStationName: "$startStationName",
      dayOfWeek: "$dayOfWeek" },
    total: { $sum: 1 } },
  },
  // { $group: { _id: { $dayOfWeek: "$startTime" }, total: { $sum: 1 } } },
  // { $limit: 1 },
]);
