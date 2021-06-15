db.movies.aggregate([
  { $group: { _id: { $expr: { awards: { $regex: /Won/i } } } } },
  { $project: {
    maior_rating: { $max: "$imdb.rating" } },
  },
]);
