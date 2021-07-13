db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airline_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$airline_name"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            airplane: 1,
          },
        },
      ],
      as: "air_routes",
    },
  },
  {
    $unwind: "$air_routes",
  },
  {
    $match: {
      "air_routes.airplane": { $in: ["747", "380"] },
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
