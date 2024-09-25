const express = require("express");
const { AuthModel } = require("../models/authModel");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const { createError } = require("../utils/ErrorFile");
const jwt = require("jsonwebtoken");

authRoute.get("/",async(req,res)=>{
    try {
        const users = await AuthModel.find();
        if(!users){
            res.status(200).send("No users found, Please create an account first")
        }
        else{
            res.status(200).send(users);
        } 
    } catch (error) {
        console.log(error);
        res.send("error in getting users")
    }
})

authRoute.post("/register",async(req,res,next)=>{
    const {email,userName,password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    try {
        const isUser = await AuthModel.findOne({email});
        if(isUser){
            return res.status(400).json({
                message:"User already present with this email",
            })
        }
        const newUser = new AuthModel({
            userName:userName,
            email:email,
            password:hash
        })
        await newUser.save();
        res.status(200).json({message:"User has been created"});
    } catch (error) {
        console.log(error);   
        next(error);     
        res.status(400).send("error in register");
    }
});

authRoute.post("/login", async (req, res, next) => {
    try {
        const findUser = await AuthModel.findOne({ userName: req.body.userName });

        if (!findUser) return next(createError(401, "User not found!"));

        const findPass = await bcrypt.compare(req.body.password, findUser.password);
        if (!findPass) return next(createError(400, "Wrong Password!"));

        const { password, isAdmin, ...otherDetails } = findUser._doc;

        const token = jwt.sign({ id: findUser._id, isAdmin: findUser.isAdmin }, process.env.jwt);
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .send({ ...otherDetails });
    } catch (error) {
        next(error);  // Pass any unexpected error to the error handler middleware
    }
});


module.exports = {
    authRoute
}