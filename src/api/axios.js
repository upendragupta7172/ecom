import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecombackend-6lm3.onrender.com",
  withCredentials: true,
});

export default axiosInstance;