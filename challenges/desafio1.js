db.movies.aggregate([
  {
    $match:
    {
      "imdb.rating": { $gte: 7 },
      genres: { $ne: ["Crime", "Horror"] },
      rated: { $in: ["PG", "P"] },
      $and: [{ languages: "English" }, { languages: "Spanish" }],
    },
  },
]);
