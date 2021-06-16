db.movies.aggregate([{ $match: { "imdb.rating": { $gte: 7 },
  $nor: [{genres: "Horror"}, {genres: "Crime"}],
  $or: [{ rated: "G" }, { rated: "PG" }],
  languages: { $all: ["English", "Spanish"] } } }]);
