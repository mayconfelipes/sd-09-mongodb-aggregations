// use('aggregations');
db.trips.aggregate([
  { $group: {
    total: { $sum: 1 },
    _id: { $dayOfWeek: "$startTime" },
  } },

  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$total",
  } },

  { $sort: { total: -1 } },

  { $limit: 1 },
]);
