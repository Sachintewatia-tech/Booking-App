const express = require("express");
const { AuthModel } = require("../models/authModel");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const { createError } = require("../utils/ErrorFile");

authRoute.post("/register",async(req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    try {
        const newUser = new AuthModel({
            userName:req.body.userName,
            email:req.body.email,
            password:hash
        })
        await newUser.save();
        res.status(200).send("User has been created");
    } catch (error) {
        console.log(error);   
        next(error);     
        res.status(400).send("error in register");
    }
});

authRoute.post("/login",async(req,res,next)=>{
    try {
        const findUser = await AuthModel.findOne({userName:req.body.userName})
        if(!findUser) return next(createError(401,"User not found!"));
        
        const findPass = await bcrypt.compare(req.body.password,findUser.password);
        if(!findPass) return next(createError(400,"Wrong Password!"));

        res.status(200).send("login successfull!");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error in logging in!");
    }
})


module.exports = {
    authRoute
}