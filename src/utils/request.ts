import axios from "axios";
import JSONBig from 'json-bigint';
import { baseUrl } from "@/utils/config";

const service = axios.create({
  timeout: 60 * 1000, // request timeout
  headers: { "Content-Type": "application/json" },
  // transformResponse: [
  //   function (data) {
  //     console.log('data===>', data)
  //     console.log('data1===>', typeof data)
  //     // console.log('data2===>', typeof JSONBig.parse(data))
  //     try {
  //       console.log(1)
  //       return JSONBig.parse(data)
  //     } catch (err) {
  //       console.log(2)
  //       return data
  //     }
  //   }
  // ]
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
      return response.data;
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
