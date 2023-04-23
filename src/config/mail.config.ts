import dotenv from "dotenv";
dotenv.config();

const mailConfig = {
  host: process.env.EMAIL_HOST!,
  port: parseInt(process.env.EMAIL_PORT!),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PWD!,
  },
};

export default mailConfig;
