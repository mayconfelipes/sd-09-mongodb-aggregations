db.trips.aggregate(
  [
    {
      $match:
      {
        $expr:
        {
          $eq: [
            { $dateToString: { format: "%d/%m/%Y", date: "$startTime" } },
            "10/03/2016",
          ],
        },
      },
    },
    {
      $group:
      {
        _id: null,
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
      $project:
      {
        _id: 0,
        duracaoMediaEmMinutos:
        {
          $ceil:
          {
            $divide: ["$duracaoMedia", 60000],
          },
        },
      },
    },
  ],
);
