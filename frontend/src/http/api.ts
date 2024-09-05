import conf from "@/config/config";
import useTokenStore from "@/store";
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

export const fetchHotelsByCity = async (
  cityName: string,
  checkIn: string,
  checkOut: string,
  pageNumber = "1",
  currencyCode = "USD"
) => {
  try {
    console.log("Request Parameters:", {
      cityName,
      checkIn,
      checkOut,
      pageNumber,
      currencyCode,
    }); // Log parameters
    const response = await api.get("/api/hotels/cities", {
      params: {
        cityName,
        checkIn,
        checkOut,
        pageNumber,
        currencyCode,
      },
    });
    console.log(response.data); // Log the successful response
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
