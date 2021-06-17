const birthYear = { $toInt: "$birthYear" };

db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $group: { _id: null, max: { $max: birthYear }, min: { $min: birthYear } } },
  { $project: { maiorAnoNascimento: "$max", menorAnoNascimento: "$min", _id: 0 } },
]);
