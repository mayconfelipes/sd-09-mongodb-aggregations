db.trips.aggregate([
  {
    $addFields: {
      teste: {
        
      },
    },
  },
  {
    $group: {
      _id: "$teste",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 1,
      count: 1,
    },
  },
]);
