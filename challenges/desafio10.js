db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $sort: { duracaoMedia: 1 } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
    },
  },
]);
/**
 * consultei a conversao de milisegundos para horas na resposta do usuario Bacco
 * https://pt.stackoverflow.com/questions/14260/converter-milissegundos-para-formato-hhmm-em-java
 */
