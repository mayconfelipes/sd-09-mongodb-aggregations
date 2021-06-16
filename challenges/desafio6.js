db.movies.aggregate([
  {
    $match: { awards: { $regex: /.*Won.*Oscar/i } },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_ratind: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_ratind: { $round: ["$menor_ratind", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
