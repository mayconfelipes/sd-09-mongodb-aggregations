db.trips.aggregate([
  {
    $project: {
      usertype: 1,
      startTime: 1,
      stopTime: 1,
      _id: 0,
      differenceInHours: {
        $divide: [
          {
            $subtract: [
              "$stopTime",
              "$startTime",
            ],
          },
          3600000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracao: {
        $avg: "$differenceInHours",
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracao", 2],
      },
      _id: 0,
    },
  },
]);
