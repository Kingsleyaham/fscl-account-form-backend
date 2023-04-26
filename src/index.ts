import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import sequelize from "./database";
import { appConfig } from "./config";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors()); // Allows incoming requests from any ip

app.use(express.static(__dirname + "/assets"));

// routes
app.use("/api", router);

app.get("/", (req, res) => {
  // console.log("welcome to account page api");
  res.status(200).json({ success: 1, message: "connected successfully" });
});

// start up server
app.listen(appConfig.PORT, async () => {
  console.log(`server running on http://${appConfig.HOST}:${appConfig.PORT}`);

  try {
    await sequelize.authenticate();
    // if (appConfig.NODE_ENV === "development") await sequelize.sync({ alter: true });
    await sequelize.sync({ alter: true });
    console.log("Connection to database successful.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
