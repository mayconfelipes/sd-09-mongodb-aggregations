const min = 60 * 1000;
db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          min,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$tripTime",
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
