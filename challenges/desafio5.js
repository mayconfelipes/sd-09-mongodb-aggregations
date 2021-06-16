const favActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true },
  } },
  { $addFields: { nun_favs: { $size:
    { $setIntersection: [favActors, "$cast"] },
  } } },
  { $sort: { nun_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
