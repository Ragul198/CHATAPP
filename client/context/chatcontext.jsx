import { createContext, useContext, useEffect, useState } from "react"
import { Authcontext } from "./Authcontext";
import toast from "react-hot-toast";

 export const ChatContext = createContext();


 export const ChatProvider = ({children}) => {
const [messages, setMessages] = useState([]);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [unseenMessages, setUnseenMessages] = useState({});
const {axios,socket} = useContext(Authcontext);



//function to get all user for side bar

const getUsers=async()=>{
    try{
    const{data}=await axios.get("/api/messages/users");
    if(data?.success){
        setUsers(data.users);
        setUnseenMessages(data.unseenMessagesCount);
    }
}catch(error){
    toast.error(error.message);
}
}
// fuction to get messages for selected user
    const getMessages = async (userId) => {
        if (!userId) return;
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            console.log("Fetched messages:", data.messages); // ✅ Debug
            if (data?.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    // fuction to send message to selected user

    const sendMessage = async (message) => {
        if (!selectedUser) return;
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser?._id}`, message)
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            }
            else{
                console.log(data.message);
                toast.error(data.message);
            }
                
            
        } catch (error) {
            
        }
    }

// function to subscribe to messsages for selected user
    const subscribeToMessages = () => {
        if(!socket) return;
        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }
           setUnseenMessages(prev => {
              const currentCount = prev[newMessage.senderId] || 0;
                return {
                     ...prev,
                    [newMessage.senderId]: currentCount + 1
                 };
                });
        });
    }
    //function to unscribe from messages 
    const unsubscribeFromMessages = () => {
        if(socket)
        socket.off("newMessage");
    }

    useEffect(() => {
        subscribeToMessages ();
        return () => {
            unsubscribeFromMessages();
        }
    },[socket,selectedUser])
    const value = {
            messages,
            users,
            selectedUser,
            setSelectedUser,
            sendMessage,
            getMessages,
            getUsers,
            unseenMessages,
            setUnseenMessages


    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
 }