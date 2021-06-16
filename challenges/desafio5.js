const favoritesActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: favoritesActors },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            favoritesActors, "$cast", 
          ],
        },
      },
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
      _id: false,
      title: true,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
