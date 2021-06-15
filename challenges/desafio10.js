// Desafio 10
// Encontre a média de viagens por tipo de usuário.
// Exiba o valor em horas com apenas duas casas decimais
// Exiba a média de viagens ordenada de forma crescente.
// Para arredondar a média use o $round.

use("aggregations");
db.trips.aggregate([
  {
    $addFields: {
      tempoDeViagem: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$tempoDeViagem",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$duracaoMedia", 60 * 60 * 1000] },
          2],
      },
    },
  },
]);
