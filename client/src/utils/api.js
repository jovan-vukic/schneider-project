import axios from "axios";
import { getDevices } from "../services/DeviceService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token && token !== "") config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to ping the server to keep it alive
export const keepServerAlive = async () => {
  const interval = 30000; // 5 minutes

  setInterval(async () => {
    await getDevices()
      .then((response) => {
        console.log(
          `Pinged at ${new Date().toISOString()}: Status Code ${
            response.status
          }`
        );
      })
      .catch((_) => {
        console.log(`Pinged at ${new Date().toISOString()}`);
      });
  }, interval);
};

export default api;
