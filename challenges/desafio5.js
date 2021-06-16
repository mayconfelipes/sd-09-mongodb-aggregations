db.movies.aggregate([
  { $match: { $and: [
    { cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "Georg Clooney"] } },
    { countries: "USA" },
    { "tomatoes.viewer.rating": { $gte: 3 } },
  ] } },
  { $skip: 24 },
  { $project: { _id: 0, title: 1 } },
]);
