db.movies.aggregate(
  [
    {
      $unwind: "$cast",
    },
  ],
);
