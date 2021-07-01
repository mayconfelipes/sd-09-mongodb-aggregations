/*
Utilizando o mesmo pipeline anterior, retorne apenas os campos title, rated, imdb.rating, imdb.votes e year, modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente.
*/
db.movies.aggregate([
  {
    $match: {
      "imdb.rating": {
        $gte: 7,
      },
      genres: {
        $nin: [
          "Crime",
          "Horror",
        ],
      },
      rated: {
        $in: [
          "PG",
          "G",
        ],
      },
      languages: {
        $all: [
          "English",
          "Spanish",
        ],
      },
    },
  },
  {
    $limit: 41,
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rating",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);
