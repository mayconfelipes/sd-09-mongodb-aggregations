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
//     },
//   },
//   { $sort: { num_favs: -1 } },
//   { $skip: 24 }
// ]);

// db.movies.aggregate([
//   {
//     $match:
//     {
//       countries: "USA",
//       "tomatoes.viewer.rating": { $gte: 3 },
//     },
//   },
//   {
//     $addFields:
//     {
//       num_favs:
//         {
//           $setIntersection:
//           [
//             "$cast",
//             [
//               "Sandra Bullock",
//               "Tom Hanks",
//               "Julia Roberts",
//               "Kevin Spacey",
//               "George Clooney",
//             ],
//           ],
//         },
//     },
//   },
//   {
//     $project:
//     {
//       _id: 0,
//       title: 1,
//       total_favs: { $size: "$num_favs" },
//       num_favs: 1,
//     },
//   },
//   { $sort: { total_favs: -1 } },
// ]);
