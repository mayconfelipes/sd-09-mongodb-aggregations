db.air_routes.aggregate([
  { $match: { airplane: { $in: ["380", "747"] } } },
  { $lookup:
    {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "airlines",
    },
  },
  { $unwind: "$airlines" },
  { $group: { _id: "$airlines.name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
