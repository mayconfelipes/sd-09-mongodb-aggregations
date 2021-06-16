db.trips.aggregate([
  {
    $addFields: {
      tripLenght: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      tripAverage: { $avg: "$tripLenght" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$tripAverage" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
