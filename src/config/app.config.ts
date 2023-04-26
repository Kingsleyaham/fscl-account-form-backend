import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  PORT: process.env.PORT! || 5000,
  HOST: process.env.HOST! || "localhost",
  NODE_ENV: process.env.NODE_ENV!,
};

export default appConfig;
