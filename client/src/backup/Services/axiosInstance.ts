import axios from "axios";

const apiBaseURL = "http://localhost:5167/api/";

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;