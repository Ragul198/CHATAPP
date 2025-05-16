import express from "express";
import { isAuthenticated, login, signup, updateProfile } from "../controllers/usercontroller.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.put("/update-profile",protect,updateProfile);
userRouter.get("/check",protect,isAuthenticated);


export default userRouter