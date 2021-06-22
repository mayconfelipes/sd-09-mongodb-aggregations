db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won\s\d+.Oscars?/ },
      // Won matches the characters Won literally (case sensitive)
      // \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
      // \d matches a digit (equivalent to [0-9])
      // + matches the previous token between one and unlimited times,
      // as many times as possible, giving back as needed (greedy)
      // . matches any character (except for line terminators)
      // Oscar matches the characters Oscar literally (case sensitive)
      // s matches the character s literally (case sensitive)
      // ? matches the previous token between zero and one times,
      // as many times as possible, giving back as needed (greedy)
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      mediaRating: { $avg: "$imdb.rating" },
      desvioPadrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$mediaRating", 1] },
      desvio_padrao: { $round: ["$desvioPadrao", 1] },
    },
  },
]);
