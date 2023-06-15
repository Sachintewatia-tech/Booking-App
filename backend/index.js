const express = require("express");
const { connection } = require("./db");
const app = express();
require('dotenv').config();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the app");
})


app.listen(process.env.port,async()=>{
    try {
        await connection 
        console.log('conneted to backend');
    } catch (error) {
        console.log('error in backend');
    }
    console.log(`server running on ${process.env.port} port`);
})