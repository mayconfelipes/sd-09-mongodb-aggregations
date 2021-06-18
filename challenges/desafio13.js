db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [{ $year: "$startTime" }, 2016],

      },
    },
  },
  {
    $match: {
      $expr: {
        $eq: [{ $month: "$startTime" }, 3],

      },
    },
  },
  {
    $match: {
      $expr: {

        $eq: [{ $dayOfMonth: "$startTime" }, 10],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            {
              $subtract: [
                "$stopTime", "$startTime",
              ],
            },
            60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
