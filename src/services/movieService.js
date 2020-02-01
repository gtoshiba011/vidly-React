import { getGenres } from "./genreService";
import http from "./httpService";
import config from "../config.json";

async function getMovies() {
  const movies = await http.get(config.apiEndpoint + "/movies");
  return movies;
}

export { getMovies };
