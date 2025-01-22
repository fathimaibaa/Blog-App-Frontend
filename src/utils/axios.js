import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://blog-app-backend-gt8x.onrender.com",
  withCredentials: true,
});
