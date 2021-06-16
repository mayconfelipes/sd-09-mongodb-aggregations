// db.movies.aggregate([
//   {
//     $match:
//     {
//       countries: "USA",
//       "tomatoes.viewer.rating": { $gte: 3 },
//     },
//   },
//   {
//     $project:
//     {
//       _id: 0,
//       title: 1,
//       num_favs: { $setIntersection: ["$cast", [
//         "Sandra Bullock",
//         "Tom Hanks",
//         "Julia Roberts",
//         "Kevin Spacey",
//         "George Clooney",
//       ]] },
//       total_favs: { $size: "$num_favs" },
//     },
//   },
//   { $sort: { num_favs: -1 } },
// ]);

db.movies.aggregate([
  {
    $match:
    {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields:
    {
      num_favs:
        {
          $setIntersection:
          [
            "$cast",
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          ],
        },
    },
  },
  { $sort: { total_favs: -1 } },
  {
    $project:
    {
      _id: 0,
      title: 1,
      total_favs: { $size: "$num_favs" },
      num_favs: 1,
    },
  },
]);
