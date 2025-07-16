import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000, // Set timeout to 20 seconds
  withCredentials: true, // Include credentials in requests
});
// console.log("Axios instance created with base URL:", import.meta.env.VITE_API_URL);
export default axiosInstance;
