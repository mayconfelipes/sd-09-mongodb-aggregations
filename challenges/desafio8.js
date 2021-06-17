db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: {
    from: "air_alliances",
    let: { airline_name: "$airline.name" },
    pipeline: [
      { $match: { $expr: { $in: ["$$airline_name", "$airlines"] } } },
    ],
    as: "teste",
  } },
  { $sort: { teste: -1 } },
]);
