import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecombackend-8yfl.onrender.com",
  withCredentials: true,
});

export default axiosInstance;