const milSegPorHora = 60 * 60 * 1000;

db.trips.aggregate([
  {
    $group:
    {
      _id: "$usertype",
      total: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project:
    {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$total", milSegPorHora] }, 2] },
    },
  },
]);
