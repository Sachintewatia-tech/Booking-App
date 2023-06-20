const jwt = require("jsonwebtoken");
const { createError } = require("./ErrorFile");
require("dotenv").config();

// for verifying the token
const verifyToekn = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated!"));
    }
    jwt.verify(token,process.env.jwt,(err,user)=>{
        if(err) return next(createError(402,"Token is not valid!"));
        req.user = user;
        next();
    });
}

// for verifying the user and admin also
    const verifyUser = (req,res,next)=>{
        verifyToekn(req,res,next,()=>{
            console.log("req",req.user);
            console.log("param",req.params);
            if(req.user.id==req.params.id || req.user.isAdmin){
                next();
            }else{
                return next(createError(402,"User is not verified!"));
            }
        })
    }

    // for verifying the admin

    const verifyAdmin = (req,res,next)=>{
        verifyToekn(req,res,next,()=>{
            console.log("req",req.user);
            if(req.user.isAdmin){
                next();
            }else{
                return next(createError(402,"Only Admin has the access!"));
            }
        })
    }

module.exports = {
    verifyToekn,verifyUser,verifyAdmin
}