db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: 1,
        $ne: "",
      },
    },
  },
  {
    $addFields: {
      convertYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertYear" },
      menorAnoNascimento: { $min: "$convertYear" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
