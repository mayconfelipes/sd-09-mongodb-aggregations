db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    let: { allianceName: "$airlines" },
    pipeline: [{ $match: { $expr: {
      $in: ["$airline.name", "$$allianceName"],
    } } }],
    as: "result",
  } },
  { $unwind: "$result" },
  { $match: { "result.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", total: { $sum: 1 } } },
  { $project: { _id: 1, totalRotas: { $max: "$total" } } },
  { $limit: 1 },
]);
