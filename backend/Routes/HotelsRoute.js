const express = require("express");
const { HotelModel } = require("../models/hotelModel");
const hotelRoute = express.Router();

// for getting
hotelRoute.get("/",async(req,res)=>{
    try {
        const hotels =  await HotelModel.find();
        res.status(200).send(hotels);
    } catch (error) {
        console.log(error);
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
hotelRoute.post("/add",async(req,res)=>{
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
hotelRoute.patch("/update/:id",async(req,res)=>{
    try {
        const update = await HotelModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send({"successful":update})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in updating"});
    }
})


module.exports = {
   hotelRoute
}