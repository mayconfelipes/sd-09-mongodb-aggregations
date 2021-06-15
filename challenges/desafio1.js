db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  // { // Somar o retorno do pipeline
  //   $group: {
  //     _id: "", contagem: { $sum: 1 },
  //   },
  // },
]);
