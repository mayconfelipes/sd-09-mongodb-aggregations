db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: {
    from: "air_alliances",
    localField: "airlines",
    foreignField: "airline.name",
    as: "alliances",
  } },
  { $sort: { alliances: -1 } },
  { $limit: 1 },
  // { $project: { _id: 0, alliances: 1 } },
  // { $group: { _id: "$airlinesname", totalRotas: { $sum: 1 } } },
]).pretty();

db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    localField: "name",
    foreignField: "airline.name",
    as: "alliances",
  } },
]).pretty();
