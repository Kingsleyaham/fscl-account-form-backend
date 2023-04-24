import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  DB_HOST: process.env.DB_HOST!,
  DB_USERNAME: process.env.DB_USERNAME!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  DB_PORT: parseInt(process.env.DB_PORT!),
};

export default dbConfig;
