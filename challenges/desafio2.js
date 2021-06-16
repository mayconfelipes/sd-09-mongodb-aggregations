db.movies.aggregate([{ $match: { "imdb.rating": { $gte: 7 },
  $nor: [{ genres: "Horror" }, { genres: "Crime" }],
  $or: [{ rated: "G" }, { rated: "PG" }],
  languages: { $all: ["English", "Spanish"] } } },
{ $project: {
  titulo: "$title",
  avaliado: "$rated",
  notaIMDB: "$imdb.rating",
  votosIMDB: "$imdb.votes",
  ano: "$year",
  _id: 0,
} }]);
