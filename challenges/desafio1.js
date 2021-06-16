db.movies.aggregate([
  {
    $match:
    {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "P"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
