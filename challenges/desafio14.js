// Desafio 14
// Baseado na duração média das viagens, determine quais são
// as 5 bicicletas que foram mais utilizadas.
// Exiba o resultado em minutos arredondados para cima e em ordem decrescente.

db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$duracao",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$duracaoMedia", 60 * 1000],
        },
      },
    },
  },
]);
