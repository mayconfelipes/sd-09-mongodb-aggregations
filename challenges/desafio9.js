db.trips.aggregate([
  {
    $addFields: {
      nascimento: { $isNumber: "$birthYear" },
    },
  },
  {
    $match: {
      nascimento: true,
    }
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    }
  },
  {
    $project: { _id: 0 }
  }
]);