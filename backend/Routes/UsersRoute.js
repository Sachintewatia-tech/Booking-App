const express = require("express");
const { UserModel } = require("../models/hotelModel");
const { createError } = require("../utils/ErrorFile");
const userRoute = express.Router();

// for getting
userRoute.get("/",async(req,res,next)=>{
    // const fail = true;
    // if(fail) return next(createError(404,"You are not Authenticated!"));
    try {
        const users =  await UserModel.find();
        res.status(200).send(users);
    } catch (err) {
        // next(err);
        res.status(400).send("error in getting hotels");
    }
})

// "type":"DOSA specialist",
//   "title":"Very good hotel in city",
//   "desc":"kjhovidjiown",
//   "city":"Palwal",
//   "address":"Palwal",
//   "distance":"300",
//   "cheapestPrice":1000



// for posting the new hotel
userRoute.post("/add",async(req,res)=>{
    const newuser = new UserModel(req.body);
    try {
        const saveduser = await newuser.save();
        res.status(200).send({"msg":"New hotel added!"})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in adding hotels???"})
    }
});

// for updating 
userRoute.patch("/update/:id",async(req,res)=>{
    try {
        const update = await UserModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send({"successful":update})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in updating"});
    }
})

// for deleting the data
userRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const deleteuser = await UserModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).send(deleteuser);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in deleting the data");
    }
});

// for single hotel
userRoute.get("/:id",async(req,res)=>{
    try {
        const oneuser = await UserModel.findById(req.params.id);
        res.send(oneuser);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in finding single hotel");
    }
})


module.exports = {
   userRoute
}