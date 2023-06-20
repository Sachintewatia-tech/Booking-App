const jwt = require("jsonwebtoken");
const { createError } = require("./ErrorFile");
require("dotenv").config();

const verifyToekn = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated!"));
    }
    jwt.verify(token,process.env.jwt,(err,user)=>{
        if(err) return next(createError(402,"Token is not valid!"));
        req.user = user;
        next();
    })
}
module.exports = {
    verifyToekn
}