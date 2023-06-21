const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true},
{
    versionKey:false
});

const AuthModel = mongoose.model("user",AuthSchema);

module.exports = {
    AuthModel
}