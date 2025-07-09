import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  withCredentials: true, // Include credentials in requests
});
// console.log("Axios instance created with base URL:", import.meta.env.VITE_API_URL);
export default axiosInstance;
