use("aggregations");
db.air_alliances.aggregate([
  { $unwind:  "$airlines"},
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "airp"
  }}
  // { $project: { _id: false, airlines: true, "airp.airplane": true}}
]);

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { cia: "$airlines" },
    pipeline: [
      { $match: { $expr: {  $eq: ["$airline.name", "$$cia"] } } },
      { $project: { _id: false, airplane: true } }],
    as: "airp" } }]);
// { $project: { _id: false, airlines: true, "airp.airplane": true}}



use("aggregations");
db.air_alliances.aggregate([
  { $unwind:  "$airlines"},
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "airp"
  }}

  // { $match: { $or: [{ "$airp.airplane": { $regex: /747/ }]} },
  // { $project: { _id: false, name: true, airlines: true, "airp.airplane": true}}
]);



{ $or: [ { "airp.airplane": { $regex: /747/ }, 
    { "airp.airplane": { $regex: /380/ } }] } 


use("aggregations");
db.air_routes.aggregate([
  { $match: { $or: [ { airplane: { $regex: /380/ } }, { airplane: { $regex: /747/ } }] } },
  { $group: { _id: "$airline.name", routes: { $sum: 1} } },
  // { $project: { _id: true, "airline.name": true, routes: true } },

  { $lookup: {
    from: "air_aliances",
    localField: "_id",
    foreignField: "airlines",
    as: "airp" } }

]);


db.air_alliances.aggregate([
  { $unwind:  "$airlines"},
  { $lookup: {
    from: "air_routes",
    let: { airline: "$airlines" },
    pipeline: [ 
      { $match: { $eq: { "$airline.name": "$$airline" } }

      },
      { $project: { _id: false, airplane: true } }
    ],
    as: "plane" } }

  
]);