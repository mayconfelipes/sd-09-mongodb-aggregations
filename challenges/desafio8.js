db.air_routes.aggregate([
  { $match: { airplane: { $in: ["380", "747"] } } },
  { $group: { _id: "$airline.name", routes: { $sum: 1 } } },
  { $lookup: {
    from: "air_alliances",
    let: { airline: "$_id" },
    pipeline: [
      { $unwind: "$airlines" },
      { $match: { $expr: { $eq: ["$airlines", "$$airline"] } } },
      { $project: { _id: false, name: true } }],
    as: "airAliance" } },
  { $unwind: "$airAliance" },
  { $sort: { "airAliance.name": -1 } },
  { $group: { _id: "$airAliance.name", totalRotas: { $sum: "$routes" } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }]);
