import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user && user.id) {
    config.headers["X-User-Id"] = user.id;
  }

  return config;
});

export default axiosInstance;