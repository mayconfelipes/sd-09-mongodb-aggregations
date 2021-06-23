db.trips.aggregate([
  { $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dayOfWeek",
    total: { $sum: 1 },
  } },
  { $lookup: {
    from: "trips",
    let: { diaDaSemana: "$_id" },
    pipeline: [
      { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, "$$diaDaSemana"] } } },
      { $group: {
        _id: "$startStationName",
        startStationTotal: { $sum: 1 },
      } },
      { $project: {
        _id: 0,
        startStationName: "$_id",
        startStationTotal: "$startStationTotal",
      } },
    ],
    as: "totalsByStartStation",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $unwind: "$totalsByStartStation" },
  { $sort: { "totalsByStartStation.startStationTotal": -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    nomeEstacao: "$totalsByStartStation.startStationName",
    total: "$totalsByStartStation.startStationTotal",
  } },
]);
