import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT || 5513,
  mongoUrl: process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
