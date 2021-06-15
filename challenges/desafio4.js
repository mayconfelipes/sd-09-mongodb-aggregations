db.movies.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          { $size: {
            $split: ["$title", " "],
          } },
          1,
        ],
      },
    },
  },
  { $addFields: {
    title_split: {
      $split: ["$title", " "],
    },
  } },
  { $sort: { title: 1 } },
  { $project: {
    _id: 0, title_split: 1,
  } },
]);
