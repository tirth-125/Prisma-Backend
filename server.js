// import express from "express";
import "dotenv/config";
import app from "./app.js";

// app.get("/" , (req,res)=>{
//     return res.send("HEllO");
// });

const port = process.env.PORT||3000;
app.listen(port , (req,res)=>{
    console.log(`server is running on port is ${port}`);
});