db.movies.aggregate(
  [
    {
      $addFields: {
        titleSize: { $size: { $split: ["$title", " "] } },
      },
    },
    {
      $match: { titleSize: { $eq: 1 } },
    },
    {
      $addFields: {
        title_split: "$title",
      },
    },
    {
      $project: { _id: 0, title_split: 1 },
    },
    {
      $sort: { title_split: 1 },
    },
  ],
);
