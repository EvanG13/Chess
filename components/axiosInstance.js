import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
const url = BACKEND_BASE_URL;
// Create an Axios instance
console.log(url);
const axiosInstance = axios.create({
  baseURL: url // Your base URL, typically from an env variable
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the session token from sessionStorage
    const token = sessionStorage.getItem("sessionToken");
    const userId = sessionStorage.getItem("userId");

    // If a token exists, set the Authorization header
    if (token) {
      config.headers["Authorization"] = token;
    }

    if (userId) {
      config.headers["userid"] = userId;
    }

    return config;
  },
  (error) => {
    // Handle the error before request is sent
    return Promise.reject(error);
  }
);

export default axiosInstance;
