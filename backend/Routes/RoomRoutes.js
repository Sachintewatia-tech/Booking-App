const express = require("express");
const roomRoute = express.Router();

roomRoute.get("/",(req,res)=>{
    res.send("room endpoint");
})


module.exports = {
    roomRoute
}