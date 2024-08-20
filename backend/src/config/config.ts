import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT || 5513,
  mongoUrl: process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  geminiApi: process.env.GEMINI_API_KEY,
  rapidapiKey: process.env.RAPIDAPI_KEY,
  rapidapiHost: process.env.RAPIDAPI_HOST,
  rapidapiHost2: process.env.RAPIDAPI_HOST2,
  bookingdotcomapiurl: process.env.BOOKING_DOT_COM_RAPIDAPI_URL,
  geoCodeapiUrl: process.env.GEOCODE_RAPIDAPI_URL
};

export const config = Object.freeze(_config);
