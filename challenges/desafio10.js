db.trips.aggregate([
  {
    $addFields: {
      durationTime:
      {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          1000 * 60 * 60,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$durationTime",
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          "$duracaoMedia",
          2,
        ],
      },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
