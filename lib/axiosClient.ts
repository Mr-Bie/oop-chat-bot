import axios, { InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL for all API calls
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

// Add a request interceptor to customize caching for specific requests
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers?.["use-cache"]) {
    // Enable caching for this request
    delete config.headers["Cache-Control"];
    delete config.headers["Pragma"];
    delete config.headers["Expires"];
  }
  return config;
});

export default axiosClient;
