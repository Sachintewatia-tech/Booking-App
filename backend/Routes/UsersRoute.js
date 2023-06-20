const express = require("express");
const { createError } = require("../utils/ErrorFile");
const { verifyToekn, verifyUser, verifyAdmin } = require("../utils/verifyToken");
const { AuthModel } = require("../models/authModel");
const userRoute = express.Router();


// userRoute.get("/checkauth",verifyToekn,(req,res,next)=>{
//     res.send("you are logged in!")
// })

// userRoute.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("you are logged in and able to delete your account!")
// })

// userRoute.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("you are admin and able to delete all account!");
// })


// for getting
userRoute.get("/",verifyAdmin,async(req,res,next)=>{
    try {
        const users =  await AuthModel.find();
        res.status(200).send(users);
    } catch (err) {
        // next(err);
        res.status(400).send("error in getting user");
    }
})


// for posting the new user
userRoute.post("/add",verifyUser,async(req,res)=>{
    const newuser = new AuthModel(req.body);
    try {
        const saveduser = await newuser.save();
        res.status(200).send({"msg":"New user added!"})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in adding user???"})
    }
});

// for updating 
userRoute.patch("/update/:id",verifyUser,async(req,res)=>{
    try {
        const update = await AuthModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send({"successful":update})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in updating user"});
    }
})

// for deleting the data
userRoute.delete("/delete/:id",verifyUser,async(req,res)=>{
    try {
        const deleteuser = await AuthModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).send(deleteuser);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in deleting the user");
    }
});

// for single hotel
userRoute.get("/:id",verifyUser,async(req,res)=>{
    try {
        const oneuser = await AuthModel.findById(req.params.id);
        res.send(oneuser);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in finding single user");
    }
})


module.exports = {
   userRoute
}