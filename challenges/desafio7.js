db.movies.aggregate([
  {
    $match: {
      languages: { $regex: /^English/i },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
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
      numeroFilmes: "$numeroFilmes",
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);
