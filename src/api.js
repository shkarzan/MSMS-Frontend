import axios from "axios";
import { NotificationManager } from "react-notifications";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    NotificationManager.error("Error Message : " + error);
    return Promise.reject(error);
  }
);

export default api;
