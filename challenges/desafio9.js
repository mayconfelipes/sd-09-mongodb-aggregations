db.trips.aggregate([
  {
    $project: {
      _id: 0,
      birthYear: 1,
    },
  },
  {
    $match: {
      birthYear: {
        $type: "number",
      },
    },
  },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: {
        $max: "$birthYear",
      },
      menorAnoNascimento: {
        $min: "$birthYear",
      },
    },
  },
]);
