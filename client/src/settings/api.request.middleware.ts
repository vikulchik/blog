import axios from "axios";
import { localStorageService } from "../services/local-storage.service";

axios.interceptors.request.use(function(config) {
  if (!config || !config.headers) return config;
  const token = localStorageService.get("token");

  if (token) {
    config.headers.Authorization = token;
  }

  config.headers["Content-Type"] = "Application/json";

  return config;

}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});
