const castTemp = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  { $match: {
    countries: { $in: ["USA"] },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $in: castTemp } } },
  { $addFields: { num_favs: { $size: { $setIntersection: ["$cast", castTemp] } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $project: { _id: false, title: true } },
  { $limit: 1 }]);
