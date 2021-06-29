db.trips.aggregate([
  { $match: { birthYear: { $exists: true } } },
  { $match: { birthYear: { $ne: "" } } },
  { $addFields: { birthYear: { $toInt: "$birthYear" } } },
  // { $group: { _id: null, count: { $sum: 1 } } },
  // { $addFields: { maiorAnoNascimento: "$birthYear" } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" } } },
  { $project: { _id: 0 } },
]);
