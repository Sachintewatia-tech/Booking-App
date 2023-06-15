const express = require("express");
const authRoute = express.Router();

authRoute.get("/",(req,res)=>{
    res.send("auth endpoint");
})


module.exports = {
    authRoute
}