db.movies.aggregate([
  {
    $match: {
      countries: {
        $all: ["USA"],
      },
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
      cast: { $exists: true },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      num_favs: {
        $let: {
          vars: {
            favorites: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
          },
          in: { $size: { $setIntersection: ["$cast", "$$favorites"] } },
        },
      },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1 } },
]);
