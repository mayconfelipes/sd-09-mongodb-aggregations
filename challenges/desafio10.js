const milisecondsToHour = 1000 * 60 * 60;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "usertype",
      duracaoMedia: { $round: [{
        $divide: ["$duracaoMedia", milisecondsToHour],
      }, 2] },
    }
  }
]);
