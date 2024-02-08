import mongoose from "mongoose";
import express from "express";
import { DB_Name } from "./constants.js";
import connectDB from "./database/monogdb.js";

import dotenv from "dotenv";

const app =express()

dotenv.config({
    path: './env'
})
connectDB();




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})