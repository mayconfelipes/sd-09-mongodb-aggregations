db.air_alliances.aggregate(
  [
    {
      $unwind: "$airlines",
    },
    {
      $lookup:
      {
        from: "air_routes",
        let: { airline: "$airlines" },
        pipeline:
        [
          {
            $match:
            {
              $expr:
              {
                $eq: ["$airline.name", "$$airline"],
              },
              airplane: { $in: ["747", "380"] },
            },
          },
        ],
        as: "rotas",
      },
    },
    {
      $unwind: "$rotas",
    },
    {
      $group:
      {
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
  ],
);
