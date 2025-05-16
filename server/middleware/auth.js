import jwt from "jsonwebtoken";
import User from "../models/User.js";
//middleware to protect routes

export const protect = async (req, res, next) => {

    try {
        const token = req.headers.token;
        if(!token){
            return res.json({success: false, message: "Not authorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }
         
        req.user = user;
        next();
    } catch (error) {
        res.json({success: false, message:error.message});
    }
}