const favsActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate(
  [
    {
      $match:
      {
        countries: ["USA"],
        "tomatoes.viewer.rating": { $gte: 3 },
        cast: { $in: favsActors },
      },
    },
    {
      $project:
      {
        _id: 0,
        title: 1,
      },
    },
    {
      $group:
      {
        _id: "$cast",
        num_favs:
        {
          $size: { $setIntersection: [favsActors, "$cast"] },
        },
      },
    },
    {
      $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
    },
    { $limit: 25 },
  ],
);
