use("aggregations");

db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airlines",
      foreignField: "airline.name",
      as: "name_routes",
    },
  },
  {
    $unwind: "$name_routes",
  },
  {
    $match: { airplane: { $in: ["747", "380"] } },
  },

  {
    $group: { _id: "$name_routes.name", totalRotas: { $sum: 1 } },
  },
  {
    $sort: { totalRotas: -1 },
  },
]);
