export const fetchMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmQ4ZTAwZGJhZWE5YjM1ZGM5ZWQwMTNjMTE5ZDdhNSIsInN1YiI6IjY1NWU5OWM0MTgwZGVhMDBhZDgxYjMzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6Tb2dbdmr2mFfSScGDhN7QznefRG-Fmrwa7-DVyzLk",
      },
    },
  );
  return res.json();
};

export const fetchTvShows = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmQ4ZTAwZGJhZWE5YjM1ZGM5ZWQwMTNjMTE5ZDdhNSIsInN1YiI6IjY1NWU5OWM0MTgwZGVhMDBhZDgxYjMzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6Tb2dbdmr2mFfSScGDhN7QznefRG-Fmrwa7-DVyzLk",
      },
    },
  );
  return res.json();
};
