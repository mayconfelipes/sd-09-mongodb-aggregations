/*
Desafio 5
Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais
são seus atores ou atrizes preferidos. Aqui está o resultado:

  Sandra Bullock
  Tom Hanks
  Julia Roberts
  Kevin Spacey
  George Clooney

Considerando esta lista, crie uma pipeline que retorne o title do vigésimo quinto filme da
agregação que satisfaz as seguintes condições:

  countries é Estados unidos
  tomatoes.viewer.rating maior ou igual a 3
  Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa lista de
  favoritos aparecem no elenco (campo cast) do filme.
  Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores como
$size e $setIntersection.

O resultado da sua query deve ter o seguinte formato:
{ "title" : <nome_do_filme> }
*/
const favoriteActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  {
    $match: {
      countries: { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: { $setIntersection: [favoriteActors, "$cast"] },
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
    $skip: 24,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $limit: 1,
  },
]);
