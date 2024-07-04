import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import expressWinston from 'express-winston'
import { transports, format } from "winston";
import logger from "./logger/logger.js";



app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



app.use(expressWinston.logger({
  winstonInstance: logger,
  statusLevels: true
}))

import userRouter from "./routes/user.routes.js";

app.get('/', (req, res) => {
  res.send('products api running new deploy for Exapmle visit:-  https://innoblestest.onrender.com');
});
app.use("/api/v1/users", userRouter);

export { app};
