db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^won \d Oscar/i },
    },
  },
  {
    $group: {
      _id: 0,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      maior_rating: "$maior_rating",
      menor_rating: "$menor_rating",
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]).pretty();
