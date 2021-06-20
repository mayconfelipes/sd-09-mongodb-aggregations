db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$airline.name", "$$airline"],
            },
            airplane: {
              $in: ["747", "380"],
            },
          },
        },
      ],
      as: "airplanes",
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$airplanes" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
