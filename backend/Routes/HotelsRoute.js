const express = require("express");
const { HotelModel } = require("../models/hotelModel");
const { createError } = require("../utils/ErrorFile");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const hotelRoute = express.Router();

// for getting
hotelRoute.get("/",async(req,res,next)=>{
    // const fail = true;
    // if(fail) return next(createError(404,"You are not Authenticated!"));
    try {
        const hotels =  await HotelModel.find();
        res.status(200).send(hotels);
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
hotelRoute.post("/add",verifyAdmin,async(req,res)=>{
    const newHotel = new HotelModel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).send({"msg":"New hotel added!"})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in adding hotels???"})
    }
});

// for updating 
hotelRoute.patch("/update/:id",verifyAdmin,async(req,res)=>{
    try {
        const update = await HotelModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send({"successful":update})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in updating"});
    }
})

// for deleting the data
hotelRoute.delete("/delete/:id",verifyAdmin, async(req,res)=>{
    try {
        const deleteHotel = await HotelModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).send(deleteHotel);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in deleting the data");
    }
});

// for single hotel
hotelRoute.get("/:id",async(req,res)=>{
    try {
        const oneHotel = await HotelModel.findById(req.params.id);
        res.send(oneHotel);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in finding single hotel");
    }
})


module.exports = {
   hotelRoute
}