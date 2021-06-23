db.trips.aggregate([
  { $project: {
    day: { $dayOfMonth: "$startTime" },
    month: { $month: "$startTime" },
    year: { $year: "$startTime" },
    tripDuration: { $subtract: ["$stopTime", "$startTime"] },
  } },
  { $match: { year: 2016, month: 3, day: 10 } },
  { $group: {
    _id: null,
    duraçãoMediaEmMinutos: { $avg: { $divide: ["$tripDuration", 60000] } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duraçãoMediaEmMinutos" },
  } },
]);
