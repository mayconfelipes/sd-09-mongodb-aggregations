db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    let: { alliance_companies: "$airlines" },
    pipeline: [{
      $match: {
        airplane: { $in: ["747", "380"] },
        $expr: {
          $in: ["$airline.name", "$$alliance_companies"],
        },
      },
    }],
    as: "alliances",
  } },
  // { $match: { "alliances.airplane": { $in: ["747", "380"] } } },
  { $project: { _id: "$name", totalRotas: { $size: "$alliances" } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
