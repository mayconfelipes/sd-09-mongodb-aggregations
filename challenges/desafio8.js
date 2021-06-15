// use('aggregations');
db.air_routes.aggregate([

  { $match: {
    airplane: { $in: ["747", "380"] },
  } },

  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "linhaRota",
  } },

  { $group: {
    _id: "$linhaRota.name",
    totalRotas: { $sum: 1 },
  } },

]);
