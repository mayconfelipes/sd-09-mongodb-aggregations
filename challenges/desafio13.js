db.trips.aggregate([
  {
    $addFields: {
      date: {
        $dateToString: { format: "%d/%m/%Y", date: "$startTime" },
      },
      duracao: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $match: {
      date: "10/03/2016",
    },
  },
  {
    $group: {
      _id: "$date",
      total: { $avg: "$duracao" },
    },
  },
  {
    $addFields: {
      duracaoMediaEmMinutos: { $divide: ["$total", 60000] },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos"] },
    },
  },
]);
