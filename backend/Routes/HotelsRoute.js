const express = require("express");
const hotelRoute = express.Router();

hotelRoute.get("/",(req,res)=>{
    res.send("hotel endpoint");
})


module.exports = {
   hotelRoute
}