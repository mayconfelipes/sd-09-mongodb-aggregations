db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      num_favs: {
        $size: {
          $setIntersection: [
            ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
            "$cast",
          ],
        },
      },
    },
  },
  {
    $match: {
      num_favs: { $gt: 0 },
    },
  },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $skip: 35 },
  { $limit: 1 },
  { $project: { title: 1 } },
]);
