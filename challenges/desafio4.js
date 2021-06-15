db.movies.aggregate([
  { $match: {
    title: { $expr: {
      
    }}
  }}
]).count();
