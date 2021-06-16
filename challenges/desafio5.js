const favoriteActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $match: {
      countries: { $eq: "USA" },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: favoriteActors },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: [favoriteActors, "$cast"] } },
    },
  },
  {
    $project: { _id: 0, title: 1 },
  },
  { $limit: 1 },
  { $skip: 24 },
]);
