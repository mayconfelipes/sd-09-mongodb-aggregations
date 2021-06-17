db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      num_favs: { $size: { $setIntersection: [["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"], "$cast"] } },
      "tomatoes.viewer.rating": 1,
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
