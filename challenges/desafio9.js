db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: "",
      },
    },
  },
  {
    $addFields: {
      year: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maior: { $max: "$year" },
      menor: { $min: "$year" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$maior",
      menorAnoNascimento: "$menor",
    },
  },
]);
