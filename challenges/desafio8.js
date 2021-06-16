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
    $group: { _id: "$teste.name", totalRotas: { $sum: 1 } },
  },
  {
    $project: { _id: 1, totalRotas: 1 },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
