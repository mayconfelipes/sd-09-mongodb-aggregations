db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      $and: [
        { languages: { $in: ["English"] } },
        { languages: { $in: ["Spanish"] } },
      ],
    },
  },
]);
