db.movies.aggregate([
  {
    $match: {
      cast: {
        $exists: 1,
      },
      languages: /english/i,
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: {
        $sum: 1,
      },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: {
        $round: ["$mediaIMDB", 1],
      },
    },
  },
]);
