db.movies.aggregate([
  {
    $match: { awards: {
      $regex: /.*Won.*Oscar/i },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      mediarating: { $avg: "$imdb.rating" },
      desviopadrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$mediarating", 1] },
      desvio_padrao: { $round: ["$desviopadrao", 1] },
    },
  },
]);
