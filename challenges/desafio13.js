/*
Desafio 13
Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.

  Arredonde o resultado para cima.

O resultado da sua query deve ter o seguinte formato:

{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
*/
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lt: ISODate("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $addFields: {
      tripDuration: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$tripDuration" },
    },
  },
  {
    $addFields: {
      duracaoMediaEmMinutos: { $divide: ["$duracaoMedia", 60 * 1000] },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
