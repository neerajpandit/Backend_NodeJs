import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
const app = express();






app.use(
  cors(),
  //   {
  //   origin: process.env.CORS_ORIGIN,
  //   credentials: true,
  // }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET, // Replace with your secret key
    resave: false,
    saveUninitialized: false,
  }),
);
// console.log(process.env.ACCESS_TOKEN_SECRET)
app.use(passport.initialize());
app.use(passport.session());


import userRouter from "./routes/user.routes.js";

app.get('/', (req, res) => {
  res.send('products api running new deploy for Exapmle visit:-  https://vibraverve.onrender.com/api/v1/product/getProduct');
});
app.use("/api/v1/users", userRouter);

export { app};
