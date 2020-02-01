import http from "./httpService";
import config from "../config.json";

export async function getGenres() {
  return http.get(config.apiEndpoint + "/genres");
}
