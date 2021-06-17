db.trips.aggregate(
  [
    {
      $group:
      {
        _id: "$bikeid",
        duracaoMedia:
        {
          $avg:
          {
            $sum:
            { $subtract: ["$stopTime", "$startTime"] },
          },
        },
      },
    },
    {
      $sort:
      {
        duracaoMedia: -1,
      },
    },
    {
      $project:
      {
        _id: 0,
        bikeId: "$_id",
        duracaoMedia:
        {
          $ceil:
          {
            $divide: ["$duracaoMedia", 60000],
          },
        },
      },
    },
    {
      $limit: 5,
    },
  ],
);
