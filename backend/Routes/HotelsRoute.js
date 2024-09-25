const express = require("express");
const { HotelModel } = require("../models/hotelModel");
const { createError } = require("../utils/ErrorFile");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const { RoomModel } = require("../models/roomModel");
const hotelRoute = express.Router();

hotelRoute.get("/", async (req, res, next) => {
    try {
        const { limit, max, min, ...others } = req.query;
        const filter = { ...others };
        if (min !== undefined) {
            filter.cheapestPrice = { $gt: parseInt(min) || 1 }; // Convert min to number
        }
        if (max !== undefined) {
            filter.cheapestPrice = { ...filter.cheapestPrice, $lt: parseInt(max) || 900 }; // Convert max to number
        }
        const hotels = await HotelModel.find(filter).limit(parseInt(limit));
        res.status(200).send(hotels);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error in getting hotels");
    }
});

// count by city
hotelRoute.get("/countbycity", async (req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(cities.map((city) => {
            return HotelModel.countDocuments({ 
                city: { $regex: new RegExp(`^${city.trim()}$`, 'i') } // Case-insensitive match
            });
        }));

        res.status(200).send(list);
    } catch (err) {
        next(err);
        res.status(400).send("Error in getting hotels");
    }
});


// count by type
hotelRoute.get("/countbytype",async(req,res,next)=>{
    try {
        const hotelCount = await HotelModel.countDocuments({type:"hotel"});        
        const apartmentCount = await HotelModel.countDocuments({type:"apartment"});        
        const resortCount = await HotelModel.countDocuments({type:"resort"});        
        const villaCount = await HotelModel.countDocuments({type:"villa"});        
        const cabinCount = await HotelModel.countDocuments({type:"cabin"});        
        res.status(200).send([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount}
        ]);
    } catch (err) {
        next(err);
        res.status(400).send("error in getting hotels");
    }
})

// count by type
hotelRoute.get("/countbytype",async(req,res,next)=>{
    try {
        const hotels =  await HotelModel.find();
        res.status(200).send(hotels);
    } catch (err) {
        next(err);
        res.status(400).send("error in getting hotels");
    }
})

// get room by id
hotelRoute.get("/room/:id",async(req,res,next)=>{
    try {
        const hotel = await HotelModel.findById(req.params.id);
        const roomList = await Promise.all(hotel.rooms.map((room)=>{
            return RoomModel.findById(room);
        }));
        res.status(200).json(roomList);
    } catch (error) {
        next(error);
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
hotelRoute.get("/find/:id",async(req,res)=>{
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