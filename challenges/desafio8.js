db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline: "$airline.name" },
      pipeline: [{
        $match: {
          $expr: {
            $in: ["$$airline", "$airlines"],
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
        },
      }],
      as: "alliance",
    },
  },
  {
    $unwind: "$alliance",
  },
  {
    $group: {
      _id: "$alliance.name",
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
