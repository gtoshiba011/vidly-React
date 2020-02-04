import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

function getMovies() {
  return http.get(apiEndpoint);
}

function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  } else {
    return http.post(apiEndpoint, movie);
  }
}

export { getMovies, getMovie, deleteMovie, saveMovie };
