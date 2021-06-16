const listOfActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  {
    $match:
     {
       countries: { $eq: "USA" },
       "tomatoes.viewer.rating": { $gte: 3 },
       cast: { $in: listOfActors },
     },
  },
  {
    $addFields:
      {
        num_favs: { $size: { $setIntersection: [listOfActors, "$cast"] } },
      },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } },
  { $limit: 25 },
  { $skip: 24 },
]);
