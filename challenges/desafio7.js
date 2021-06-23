aggregations >
  db.movies.aggregate([
    { $match: { languages: "English" } },
    { $unwind: "$cast" },
    {
      $group: {
        _id: "$cast",
        qtdFilmes: { $sum: 1 },
        mediaIMDB: { $avg: "$imdb.rating" },
      },
    },
    { $sort: { qtdFilmes: -1, _id: -1 } },
    {
      $project: {
        _id: 1,
        qtdFilmes: 1,
        mediaFilmes: { $round: ["$mediaIMDB", 1] },
      },
    },
  ]);
