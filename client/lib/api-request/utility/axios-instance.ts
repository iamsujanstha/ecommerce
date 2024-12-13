// Import the correct type
import { privateRoutePath } from "@/routes/private/private.routes";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000, // 60 seconds timeout
});

// Request interceptor to add auth token and handle request logging
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = getFromStorage("token", 'local');

    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {

    console.error("API Response Error:", error);

    if (error.response?.status === 401) {
      if (window.location.pathname !== privateRoutePath.login) {
        window.location.href = privateRoutePath.login;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
