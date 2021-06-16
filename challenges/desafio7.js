db.movies.aggregate(
  [
    {
      $match:
      {
        languages: "English",
      },
    },
    {
      $unwind: "$cast",
    },
    {
      $group:
      {
        _id: "$cast",
        numeroFilmes: { $sum: 1 },
        mediaIMDB: { $avg: "$imdb.rating" },
      },
    },
    {
      $project:
      {
        cast: 1,
        title: 1,
        numeroFilmes: 1,
        mediaIMDB: { $round: ["$mediaIMDB", 1] },
      },
    },
    {
      $sort:
      {
        numeroFilmes: -1, cast: -1,
      },
    },
  ],
);
