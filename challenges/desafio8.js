use("aggregations");
db.air_routes.aggregate([
  { $match: { $or: [ { airplane: { $regex: /380/ } }, { airplane: { $regex: /747/ } }] } },
  { $group: { _id: "$airline.name", routes: { $sum: 1} } },
  { $lookup: {
    from: "air_alliances",
    let: { teste: "$_id" },
    pipeline: [
      { $match: { airlines: { $in: [ "American Airlines" ] } } },
      { $project: { _id: false, name: true }}
    ],
    as: "airAliance" } },
    { $unwind: "$airAliance"}

    // { $project: { _id: true, "airp.name": true, routes: true } },
]);


      // { $match: { $expr: { $eq: [ true, { "$$airline": { $in: [ "$airlines"] } }] } },

      { $match: { "$airlines": { $in: [ "$$airline"] } } },

      "American Airlines"