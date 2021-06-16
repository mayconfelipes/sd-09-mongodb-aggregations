db.trips.aggregate([
  { $addFields: {
    toCompareStartDate: { $dateToString: {
      format: "%Y-%m-%d",
      date: "$startTime",
    } },
  } },
  { $match: { toCompareStartDate: { $eq: "2016-03-10" } } },
  { $group: { _id: "$toCompareStartDate", duracaoMediaEmMinutos: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 1000 * 60] } } } },
]);
