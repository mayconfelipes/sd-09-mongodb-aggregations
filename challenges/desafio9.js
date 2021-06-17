db.trips.aggregate([
  { $match: { $and: [{ birthYear: { $exists: true } }, { birthYear: { $ne: " " } }] } },
  { $group: { _id: null,
    maiorAnoNascimento: { $max: { $substrBytes: ["$birthYear", 0, 4] } },
    menorAnoNascimento: { $min: "$birthYear" } } },
  { $project: { _id: false,
    maiorAnoNascimento: { $toInt: "$maiorAnoNascimento" },
    menorAnoNascimento: { $toInt: "$menorAnoNascimento" } } }]);
