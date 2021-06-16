db.trips.aggregate([
  { $match: {
    birthYear: { $exists: true, $ne: "" },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: {
      $convert: { input: "$birthYear", to: "int" },
    } },
    menorAnoNascimento: { $min: {
      $convert: { input: "$birthYear", to: "int" },
    } },
  } },
  { $project: {
    _id: 0,
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
  } },
]);
