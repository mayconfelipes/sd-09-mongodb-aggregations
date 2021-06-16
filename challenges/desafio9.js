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
      YearInt: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maior: { $max: "$YearInt" },
      menor: { $min: "$YearInt" },
    },
  },
  {
    $project: { _id: 0, maiorAnoNascimento: "$maior", menorAnoNascimento: "$menor" },
  },
]);
