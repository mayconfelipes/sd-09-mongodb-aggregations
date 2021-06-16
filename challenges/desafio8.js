db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { al_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$al_name"],
            },
          },
        },
      ],
      as: "airlineRoutes",
    },
  },
  {
    $unwind: "$airlineRoutes",
  },
  {
    $match: {
      "airlineRoutes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
