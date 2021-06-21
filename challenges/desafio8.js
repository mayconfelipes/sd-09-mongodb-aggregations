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
                { $eq: ["$$cia_aerea", "$airline.name"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "flights",
    },
  },
  {
    $addFields: {
      routes: { $size: "$flights" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routes" },
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
