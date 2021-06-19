const castList = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gt: 2.9 },
      cast: { $in: castList },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      favs: {
        $setIntersection: ["$cast", castList],
      },
    },
  },
  { $set: { num_favs: { $size: "$favs" } } },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1 } },
]);
