db.movies.aggregate([
  {
    $match:
    {
      cast: { $exists: true },
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields:
    {
      favs: { $setIntersection: ["$cast", [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ]] },
    },
  },
  {
    $project:
    {
      _id: 0,
      favs: 1,
      title: 1,
    },
  },
  { $sort: { favs: -1 } },
  { $limit: 1 },
  { $skip: 24 },
]);

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
      num_favs: { $setIntersection: ["$cast", [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ]] },
    },
  },
  {
    $project:
    {
      _id: 0,
      title: 1,
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $limit: 1 },
  { $skip: 24 },
]);
