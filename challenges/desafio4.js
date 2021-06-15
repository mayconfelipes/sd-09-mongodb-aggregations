db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $match: {
      title_split: {
        $size: 1,
      },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
  // { // Somar o retorno do pipeline
  //   $group: {
  //     _id: "", contagem: { $sum: 1 },
  //   },
  // },
]);
