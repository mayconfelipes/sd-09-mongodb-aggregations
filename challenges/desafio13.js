db.trips.aggregate([
  { $match: { startTime: { $eq: { $dateToString: { date: "10-03-2016" } } } } },
  // { $group: { _id: "$startTime" } },
]);
