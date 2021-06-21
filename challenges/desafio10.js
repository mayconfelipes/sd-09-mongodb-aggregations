db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracao: { $sum: 1 },
      duracaoMedia: { $avg: "$duracao" },
    },
  },
]);
