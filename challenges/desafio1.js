db.movies.aggregate(
  [
    { $match: {
      "imdb.rating": { $eq: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
    },
  ],
);
