db.trips.aggregate([
  {
    $match:
    {
      birthYear: { $exists: true, $nin: [""] },
    },
  },
  {
    $project:
    {
      _id: 0,
      birthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group:
    {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
  {
    $project:
      {
        _id: 0,
      },
  },
]);
