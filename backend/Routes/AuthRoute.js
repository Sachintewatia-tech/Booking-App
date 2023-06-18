const express = require("express");
const { AuthModel } = require("../models/authModel");
const authRoute = express.Router();

authRoute.post("/register",async(req,res,next)=>{
    try {
        const newUser = new AuthModel({
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password
        })
        await newUser.save();
        res.status(200).send("User has been created");
    } catch (error) {
        console.log(error);   
        next(error);     
        res.status(400).send("error in register");
    }
})


module.exports = {
    authRoute
}