import { createContext , useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const backend_url = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backend_url
export const Authcontext = createContext();


export const Authprovider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    // CHECK IF USER IS AUTHENTICATED if so set the user data and connect the socket

    const checkAuth = async () => {
        try {
            const{data}=await axios.get("/api/auth/check");
            if(data.success){
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    //login function to handle user authintication and socket sonnection

    const login = async (state,credentials) => {
        try {
            const {data} =await axios.post(`/api/auth/${state}`,credentials);
            if(data.success){
                setAuthUser(data.user);
                connectSocket(data.user);
                setToken(data.token);
                axios.defaults.headers.common["token"] = data.token;
                localStorage.setItem("token",data.token);
                toast.success(data.message);
            }
            else{
                console.log(data.message);  
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);

        }
    }

// Logout function to handle user logout and socket disconnection

const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setSocket(null);
    axios.defaults.headers.common["token"] = null;
    toast.success("User logged out successfully");
    socket.disconnect();
}

// update profile function to handle user profile update

const updateProfile = async(body)=>{
    try {
        const {data} =await axios.put("/api/auth/update-profile",body);
        if(data.success){
            setAuthUser(data.user);
            toast.success(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}



    // connect socket function to handle socket connection and online users update
    const connectSocket =  (userData) => {
        if(!userData || socket?.connect)return;
        const newSocket = io(backend_url, {
        query: { userId: userData._id },
        });
        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (userIds) => setOnlineUsers(userIds));
    }




    useEffect(() => {
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    },[])
    const value = {
       axios,
       authUser,
       onlineUsers,
       login,
       logout,
       updateProfile,
       socket,
     
    }
    return (
        <Authcontext.Provider value={value}>
            {children}
        </Authcontext.Provider>
    )
}