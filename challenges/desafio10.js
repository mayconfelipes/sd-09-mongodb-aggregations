const hr = 60 * 60 * 1000;
db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          hr,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$tripTime" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
