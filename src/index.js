import express from "express";
import connectDB from "./database/monogdb.js";
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config({
    path: './.env'
})
connectDB()
.then(() => {
    app.listen(process.env.PORT  ||3000 ,()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("Mongo db connection failed !!",err)
});




