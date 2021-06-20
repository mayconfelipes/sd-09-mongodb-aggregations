db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { cia_aerea: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$airline.name", "$$cia_aerea"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "airline_docs",
    },
  },
  {
    $addFields: {
      rotas: { $size: "$airline_docs" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$rotas" },
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
