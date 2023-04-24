import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: "mysql",
  port: dbConfig.DB_PORT,
});

export default sequelize;
