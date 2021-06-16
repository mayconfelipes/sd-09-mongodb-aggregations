db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "aliance",
    },
  },
  { $match: { "aliance.name": { $exists: true } } },
  { $group: { _id: "$aliance.name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

