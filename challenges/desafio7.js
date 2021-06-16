db.movies.aggregate([
  { $unwind: "$cast" },
  {
    $match: { languages: "English" },
  },
  { $group: {
    _id: "$cast",
    numero_filmes: { $sum: 1 },
    mediaIMDB: { $avg: "$imdb.rating" },
  } },
  {
    $project: {
      _id: 1,
      numero_filmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: { numero_filmes: -1, _id: 1 },
  },
]);
