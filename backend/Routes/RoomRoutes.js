const express = require("express");
const { RoomModel } = require("../models/roomModel");
const { HotelModel } = require("../models/hotelModel");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const roomRoute = express.Router();

roomRoute.post("/:hotelid",async(req,res,next)=>{
    const hotelId = req.params.hotelid;
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


// for getting
roomRoute.get("/",async(req,res,next)=>{
    // const fail = true;
    // if(fail) return next(createError(404,"You are not Authenticated!"));
    try {
        const rooms =  await RoomModel.find();
        res.status(200).send(rooms);
    } catch (err) {
        // next(err);
        res.status(400).send("error in getting rooms");
    }
})



// for updating 
roomRoute.patch("/update/:id",verifyAdmin,async(req,res)=>{
    try {
        const update = await RoomModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send({"successful":update})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in updating room"});
    }
})

roomRoute.put("/availability/:id",async(req,res,next)=>{
    try {
        await RoomModel.updateOne({"roomNumber._id":req.params.id},{$push:{"roomNumber.$.unavailabelRoom":req.body.dates}});
        res.status(200).send("Room status has been updated");
    } catch (error) {
        next(err);
    }
})

// for deleting the room
roomRoute.delete("/:id/:hotlid",verifyAdmin, async(req,res)=>{
    const hotelId = req.params.hotlid; 
    try {
        const deleteRoom = await RoomModel.findByIdAndDelete({_id:req.params.id});
        try {
            await HotelModel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}});
        } catch (error) {
            next(error);
        }
        res.status(200).send(deleteRoom);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in deleting the room");
    }
});

// for single room
roomRoute.get("/:id",async(req,res)=>{
    try {
        const oneRoom = await RoomModel.findById(req.params.id);
        res.send(oneRoom);
    } catch (error) {
        console.log(error);
        res.status(400).send("error in finding single room");
    }
})

module.exports = {
    roomRoute
}