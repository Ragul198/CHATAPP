import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {

    const {fullname, email, password,bio} = req.body;

    try {
        if(!fullname || !email || !password || !bio){
            return res.json({message: "All fields are required"});
        }
        const user =await User.findOne({email});
        if(user){
            return res.json({success: false, message: "User already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({fullname, email, password: hashedPassword, bio});
        const token = generateToken(newUser._id);
        res.json({success: true, message: "User created successfully", token:token , userData: newUser});
       
    } catch (error) {
        res.json({success: false, message: "Something went wrong" ,e});
    }
}


//login user


export const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Incorrect password"});
        }
        const token = generateToken(user._id);
        res.json({success: true, message: "User logged in successfully", token:token , userData: user});
    } catch (error) {
        res.json({success: false, message: "Something went wrong" ,e});
    }
}

///contoroller to check if user is authenticated

export const isAuthenticated = (req, res) => {
   res.json({success: true, message: "User is authenticated", user: req.user});
};

// controller to update user profile details

export const updateProfile = async (req, res) => {
    try {
        const {profilepic , bio ,fullname} = req.body;
        const userId = req.user._id;
        let updatedUser ;
        if(!profilepic){
            updatedUser = await User.findByIdAndUpdate(userId, {fullname, bio},{new: true});
        }else{
            const upload = await cloudinary.uploader.upload(profilepic, {resource_type: "image"});
            updatedUser=await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, fullname, bio},{new: true});
        }

        res.json({success: true, message: "User profile updated successfully", user: updatedUser});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message:error.message});
    }
}



