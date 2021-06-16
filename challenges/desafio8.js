db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      pipeline: [
        { $match: { airplane: { $in: ["380", "747"] } } },
        { $group: { _id: "$airline.name", totalRotas: { $sum: 1 } } },
      ],
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  { $match: { $expr: { $eq: ["$airlines", "$routes._id"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: "$routes.totalRotas" } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
