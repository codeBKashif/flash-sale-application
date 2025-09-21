import axios from "axios";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "./HelperFunctions";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      setTokenToLocalStorage(null);
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default api;
