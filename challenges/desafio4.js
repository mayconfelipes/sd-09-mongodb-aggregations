// Desafio 4
// Crie uma pipeline que retorna documentos com o novo campo title_split,
// ela deve seguir as seguintes condições:
// title_split deve conter uma lista de palavras presentes em title.
// A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
// A pipeline deve ser ordenada por title em ordem alfabética.
db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $sort: {
      title: 1,
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
]);
