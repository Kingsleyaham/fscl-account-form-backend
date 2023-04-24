import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: "mysql",
  port: parseInt(process.env.DB_PORT!) || 3306,
});

export default sequelize;
