import express from "express";
import { protect } from "../middleware/auth.js";
import { getAllUsers, getAllMessages, markMessageAsSeen, sendMessage } from "../controllers/Messagecontroller.js";


const messageRouter = express.Router();

messageRouter.get("/users", protect, getAllUsers);
messageRouter.get("/:id", protect, getAllMessages);
messageRouter.put("/mark/:id", protect, markMessageAsSeen);
messageRouter.post("/send/:id", protect, sendMessage);

export default messageRouter;