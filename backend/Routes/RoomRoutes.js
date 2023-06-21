const express = require("express");
const { RoomModel } = require("../models/roomModel");
const { HotelModel } = require("../models/hotelModel");
const roomRoute = express.Router();

roomRoute.patch("/",async(req,res,next)=>{
    const hotelId = req.params.roomID;
    const newRoom = new RoomModel(req.body);
    try {
        const saveRoom = await newRoom.save();
        try {
            await HotelModel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}});
        } catch (error) {
            next(error);
        }
        res.status(200).send(saveRoom);
    } catch (error) {
        next(error);
    }
})


module.exports = {
    roomRoute
}