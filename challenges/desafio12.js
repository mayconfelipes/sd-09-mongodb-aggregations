db.trips.aggregate([
  { $group: { _id: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeDaEstacao: "$endStationName" }, total: { $sum: 1 } } },
  { $match: { "_id.diaDaSemana": 5 } },
  { $group: { _id: "$_id.nomeDaEstacao", total: { $sum: "$total" } } },
  { $sort: { total: -1 } },
]);
