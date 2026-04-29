import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecombackend-x3cl.onrender.com",
  withCredentials: true,
});

export default axiosInstance;