db.trips.aggregate([
  {
    $addFields: {
      tripDuration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      tripAverage: { $avg: "$tripDuration" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$tripAverage", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
