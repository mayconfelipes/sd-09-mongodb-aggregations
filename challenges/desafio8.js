db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "teste",
    },
  },
  {
    $match: { airplane: { $in: ["747", "380"] }, teste: { $gte: { size: 1 } } },
  },
  {
    $group: { _id: "$teste.name", count: { $sum: 1 } },
  },
  {
    $project: { _id: 1, count: 1 },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 1,
  },
]);
