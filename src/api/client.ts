import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.1.15:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Axios combines baseURL + url + params here
    const url = axios.getUri(config);
    console.log("Actual request URL:", url);
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);
export default apiClient;
