// Desafio 5

// Considerando esta lista, crie uma pipeline que retorne o title do vigésimo quinto
// filme da agregação que satisfaz as seguintes condições:
// countries é Estados unidos
// tomatoes.viewer.rating maior ou igual a 3
// Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da
// nossa lista de favoritos aparecem no elenco (campo cast) do filme.
// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.

const actors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: 1 },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [actors, "$cast"],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
]);
