db.movies.aggregate([
  { $match: { countries: {$all: "USA"}, "tomatoes.viewer.rating": { $gte: 3 } } },
  { $project: { num_favs: { $cond: {if{}} } } },
]);
