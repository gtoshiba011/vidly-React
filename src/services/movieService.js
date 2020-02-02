import http from "./httpService";
import config from "../config.json";

function getMovies() {
  return http.get(config.apiEndpoint + "/movies");
}

function deleteMovie(id) {
  return http.delete(config.apiEndpoint + "/movies/" + id);
}

export { getMovies, deleteMovie };
