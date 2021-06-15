db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $addFields: {
    birthYearInt: { $toInt: "$birthYear" },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYearInt" },
    menorAnoNascimento: { $min: "$birthYearInt" },
  },
  },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
]);
