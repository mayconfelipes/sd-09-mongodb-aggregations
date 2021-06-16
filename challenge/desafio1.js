db.movies.aggregate([{ $match: { "imdb.rating": { $gte: 7 },
  genres: { $not: { $all: ["Crime", "Horror"] } },
  $or: [{ rated: "g" }, { rated: "PG" }],
  languages: { $all: ["English", "Spanish"] } } }]);
