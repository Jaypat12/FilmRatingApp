export const mutationLogin = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmQ4ZTAwZGJhZWE5YjM1ZGM5ZWQwMTNjMTE5ZDdhNSIsInN1YiI6IjY1NWU5OWM0MTgwZGVhMDBhZDgxYjMzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6Tb2dbdmr2mFfSScGDhN7QznefRG-Fmrwa7-DVyzLk",
      },
    },
  );
  return res.json();
};
