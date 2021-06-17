db.trips.aggregate([
  { $addFields: {
    dia: { $dayOfMonth: "$startTime" },
    mes: { $month: "$startTime" },
    ano: { $year: "$startTime" },
  } },
  { $match: { $and: [
    { dia: 10 },
    { mes: 3 },
    { ano: 2016 },
  ] } },
  { $addFields: { durationTrip: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: "$durationTrip" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);
