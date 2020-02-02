import http from "./httpService";
import { apiUrl } from "../config.json";

function getMovies() {
  return http.get(apiUrl + "/movies");
}

function deleteMovie(id) {
  return http.delete(apiUrl + "/movies/" + id);
}

export { getMovies, deleteMovie };
