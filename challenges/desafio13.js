db.trips.aggregate([
  { $addFields: {
    dateStart: { $dateToParts: {
      date: "$startTime",
    } },
  } },
  { $match: {
    "dateStart.day": { $eq: 10 },
    "dateStart.month": { $eq: 3 },
    "dateStart.year": { $eq: 2016 },
  } },
  { $group: {
    _id: null,
    duracaoMediaEmMs: {
      $avg: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: {
      $ceil: {
        $divide: ["$duracaoMediaEmMs", 60000],
      },
    } } },
]);
