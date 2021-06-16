/*
Desafio 10
Encontre a média de viagens por tipo de usuário.

  Exiba o valor em horas com apenas duas casas decimais
  Exiba a média de viagens ordenada de forma crescente.

Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:
{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
*/
db.trips.aggregate([
  {
    $addFields: {
      tripDuration: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$tripDuration" },
    },
  },
  {
    $addFields: {
      duracaoMedia: { $divide: ["$duracaoMedia", 60 * 60 * 1000] },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
