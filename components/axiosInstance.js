import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
const url = BACKEND_BASE_URL;
import * as SecureStore from "expo-secure-store";

console.log(url);
const axiosInstance = axios.create({
  baseURL: url
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("sessionToken");
    const userId = await SecureStore.getItemAsync("userId");
    console.log(token);

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
