db.trips.aggregate([
  {
    $project: {
      _id: null,
      maxBirth: { $max: "$birthYear" },
    },
  },
]);
