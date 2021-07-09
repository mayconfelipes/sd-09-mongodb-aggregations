db.movies.aggregate([
  { $match:
    { $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { rated: { $in: ["Pg", "G"] } },
      { languages: { $in: ["English", "Spanish"] } },
    ] },
  },
]);
