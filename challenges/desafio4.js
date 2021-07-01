db.movies.aggregate([
  {
    $sort: {
      title: 1,
    },
  },
  {
    $project: {
      _id: 0,
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $addFields: {
      size: { $size: "$title_split" },
    },
  },
  {
    $match: {
      size: 1,
    },
  },
  {
    $project: {
      title_split: 1,
    },
  },
]);
