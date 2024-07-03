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
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.ACCESS_TOKEN_SECRET, // Replace with your secret key
//     resave: false,
//     saveUninitialized: false,
//   }),
// );
// app.use(passport.initialize());
// app.use(passport.session());

import userRouter from "./routes/user.routes.js";


//routes declaration
app.use("/api/v1/users", userRouter)

export default app;
