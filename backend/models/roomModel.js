const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    roomNumber:[{number:Number,unavailabelRoom:{type:[Date]}}]
},{timestamps:true},
{
    versionKey:false
});

const RoomModel = mongoose.model("room",roomSchema);

module.exports = {
    RoomModel
}