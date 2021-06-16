db.trips.aggregate([
  {
    $addFields:
      {
        trip_duration:
          { $subtract: ["$stopTime", "$startTime"] },
      },
  },
  {
    $group:
      {
        _id: "$usertype",
        avg_trip_time:
          {
            $avg: { $divide: ["$trip_duration", 3600000] },
          },
      },
  },
  { $project:
    {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avg_trip_time", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
