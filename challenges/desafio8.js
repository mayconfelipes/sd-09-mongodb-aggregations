db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        ciaAerea: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$$ciaAerea", "$airline.name"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "teste",
    },
  },
  {
    $addFields: {
      numOfRoutes: { $size: "$teste" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$numOfRoutes" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
