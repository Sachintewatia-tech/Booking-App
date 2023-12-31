const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { authRoute } = require("./Routes/AuthRoute");
const { userRoute } = require("./Routes/UsersRoute");
const { hotelRoute } = require("./Routes/HotelsRoute");
const { roomRoute } = require("./Routes/RoomRoutes");
const cookie_parser = require("cookie-parser");
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cookie_parser());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to the app");
})

app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/hotel",hotelRoute);
app.use("/room",roomRoute);


app.listen(process.env.port,async()=>{
    try {
        await connection 
        console.log('conneted to backend');
    } catch (error) {
        console.log('error in backend');
    }
    console.log(`server running on ${process.env.port} port`);
})