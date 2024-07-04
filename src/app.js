import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();






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



import userRouter from "./routes/user.routes.js";

app.get('/', (req, res) => {
  res.send('products api running new deploy for Exapmle visit:-  https://innoblestest.onrender.com');
});
app.use("/api/v1/users", userRouter);

export { app};
