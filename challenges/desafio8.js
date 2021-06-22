db.air_alliances.aggregate(
  [
    {
      $lookup: {
        from: "air_routes",
        let: { airlinesName: "$airlines" },
        pipeline:
        [
          {
            $match: {
              $expr: {
                $in: ["$airline.name", "$$airlinesName"],
              },
              airplane: { $in: ["747", "380"] },
            },
          },
        ],
        as: 'airAlliance',
      },
    },
    {
      $project: {
        _id: "$name",
        totalRotas: { $size: "$airAlliance" },
      },
    },
    {
      $sort: { totalRotas: -1 }
    },
    {
      $limit: 1
    },
  ]);