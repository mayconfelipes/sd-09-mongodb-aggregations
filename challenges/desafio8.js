db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      foreignField: "airline.name",
      localField: "airlines",
      as: "Airlines",
    },
  },
  {
    $unwind: "$Airlines",
  },
  {
    $match: {
      "Airlines.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
