db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { "imdb.rating": { $gte: 7 } },
          { languages: { $in: ["English", "Spanish"] } },
          {
            $or: [
              { genres: { $ne: "Crime" } },
              { genres: { $ne: "Horror" } },
              { rated: { $eq: "PG" } },
              { rated: { $eq: "G" } },
            ],
          },
        ],
      },
    },
  ],

);
