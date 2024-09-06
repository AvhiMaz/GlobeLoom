import conf from "@/config/config";
import { useTokenStore } from "@/store";
import axios from "axios";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: conf.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to include authorization token
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

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/api/users/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/api/users/logout");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/api/users/register", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
