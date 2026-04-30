import axios from "axios";

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:5000";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
