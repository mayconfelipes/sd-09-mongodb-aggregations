db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "totalRotas",
    },
  },
  {
    $unwind: "$totalRotas",
  },
  {
    $group: {
      _id: "$totalRotas", totalRotas: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: "$_id.name", totalRotas: "$totalRotas",
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
