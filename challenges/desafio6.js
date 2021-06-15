db.movies.aggregate([
  {
    $group: { _id: { $awards: { $regex: /Won/i } }, maior_rating: { $max: "$imdb.rating" } },
  },
]);

db.movies.aggregate([
  { $group: { _id: { $expr: { awards: { $regex: /Won/i } } } } },
  { $project: {
    maior_rating: { $max: "$imdb.rating" } },
  },
]);
