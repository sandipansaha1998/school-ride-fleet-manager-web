import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Axios combines baseURL + url + params here
    const url = axios.getUri(config);
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);
export default apiClient;
