db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    $nor: [{ genres: "Crime" }, { genres: "Horror" }],
    rated: { $in: ["PG", "G"] },
    $and: [{ languages: "English" }, { languages: "Spanish" }],
  } },
]);
