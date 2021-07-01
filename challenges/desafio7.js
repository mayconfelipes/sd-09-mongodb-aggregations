db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      "imdb.rating": 1,
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $set: {
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: 1,
    },
  },
]);
