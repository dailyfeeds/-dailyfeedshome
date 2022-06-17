import axios from "axios";
import { baseUrl } from "@/utils/config";

const service = axios.create({
  timeout: 60 * 1000, // request timeout
  headers: { "Content-Type": "application/json" },
});

service.interceptors.request.use(
  (config) => {
    config.baseURL = baseUrl;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  (error) => {
    const err = error.response;
    return Promise.reject(err.data);
  }
);

export default service;
