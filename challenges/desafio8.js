db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "airlines",
  } },
  { $unwind: "$airlines" },
  { $group: { _id: "$airlines.name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
// Both ways work

// --

// db.air_alliances.aggregate([
//   { $lookup: {
//     from: "air_routes",
//     localField: "airlines",
//     foreignField: "airline.name",
//     as: "routes",
//   } },
//   { $unwind: "$routes" },
//   { $match: { "routes.airplane": { $in: ["747", "380"] } } },
//   { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
//   { $sort: { totalRotas: -1 } },
//   { $limit: 1 },
// ]);
