db.movies.aggregate([
  { $match: { awards: { $exists: true }, "imdb.rating": { $ne: "" } } },
  { $project: { awards: 1, "imdb.rating": 1, teste: { $first: "$imdb.rating" } } },
  { $sort: { "imdb.rating": -1 } },
]);
