db.movies.aggregate([{
  $match: {
    $and: [
      { "imdb.rating": { $gt: 6.9 } },
      { genres: { $not: { $in: ["Crime", "Horror"] } } },
      { rated: { $in: ["PG", "G"] } },
      { languages: { $all: ["English", "Spanish"] } },
    ],
  },
}]);
