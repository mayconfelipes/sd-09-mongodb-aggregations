db.trips.aggregate([
  {
    $match: {
      startTime: {
        $lt: ISODate("2016-03-11T00:00:00.000Z"),
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
      },
    },
  },
  {
    $addFields: {
      duracao_viagens: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      media_duracao_viagens: { $avg: "$duracao_viagens" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$media_duracao_viagens" },
    },
  },
]);
