import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
import auth from "./authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

axios.interceptors.response.use(null, error => {
  console.log("INTERCEPTORS CALLED");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // handling unexpected errors globally
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put
};
