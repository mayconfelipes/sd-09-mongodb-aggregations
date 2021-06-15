db.movies.aggregate([
  {
    $match:
      { "imdb.rating": { $gte: 7 },
        genres: { $nin: ["Crime", "Horror"] },
        $or: [{ rated: "PG" }, { rated: "G" }],
        $and: [{ languages: { $in: ["English"] } }, { languages: { $in: ["Spanish"] } }],
      },
  },
]);
