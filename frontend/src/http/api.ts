import conf from "@/config/config";
import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: conf.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;
    if (token) {
      if (conf.isDevelopment) {
        console.log(token);
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
