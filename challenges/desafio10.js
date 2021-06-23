db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      tripAvgTime: {
        $avg: "$tripTime",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$tripAvgTime", 60 * 60 * 1000] },
          2],
      },
    },
  },
  { $sort: { tripAvgTime: 1 } },
]);
