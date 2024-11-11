// Import the correct type
import { privateRoutePath } from "@/routes/private/private-route-path";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000, // 60 seconds timeout
});

// Request interceptor to add auth token and handle request logging
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and custom response logging
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Response Error:", error);
    if (error.response?.status === 401) {
      // Handle unauthorized access, like logging out the user
      localStorage.removeItem("token");
      window.location.href = privateRoutePath.base;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
