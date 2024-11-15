// src/routes/table/+page.server.js

export async function load() {
  const res = await fetch('https://api.spacexdata.com/v3/landpads');
  const users = await res.json();

  return { props: { users } };
}
