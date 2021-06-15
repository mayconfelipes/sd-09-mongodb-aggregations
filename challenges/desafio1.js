// use('aggregations');
db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $not: { $in: ["Crime", "Horror"] } },

    rated: { $in: ["PG", "G"] },
    // $or: [ { rated: "PG"}, { rated: "G"} ],

    languages: { $all: ["English", "Spanish"] },
    // $and: [{ languages: "Spanish" }, { languages: "English" }],
  } },
  // { $group: { _id: null, total: {$sum: 1} }}
]);
