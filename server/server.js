import express from 'express';
import cors from 'cors';
import http from 'http';
import "dotenv/config";
import {connectDB} from "./lib/Db.js";
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';


//create Express app and http server

const app = express();
const server = http.createServer(app);  

//initalize socket.io server

export const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

//store online users

export const userSocketMap = {}; //{userId:socketId}

// socket.io connection

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId);
    if(userId) {
        userSocketMap[userId] = socket.id; 
    }
    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("user disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

//Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));



//Routes
app.use('/api/status', (req,res)=>res.send("server is live"));
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

//Database 
await connectDB();

//Listen to requests
if(process.env.NODE_ENV !== "production"){ 
    const PORT = process.env.PORT || 5000
    server.listen(PORT, () => console.log("Server is running on port :"+ PORT));
    
}
//export the server for vercel
export default server;


