import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🚀 Sending Token:", token);
    console.log("📌 Authorization Header:", config.headers.Authorization);
  }
  
  return config;
});

export default api;
