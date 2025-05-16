import React, { useState ,useContext } from 'react'
import Chatcontainer from '../components/Chatcontainer'
import Sidebar from '../components/Sidebar'
import Rightsidebar from '../components/Rightsidebar'
import { ChatContext } from '../../context/chatcontext';


const Homepage = () => {

    const {selectedUser} = useContext(ChatContext);
  return (
    <div className=' border w-full h-screen sm:px-[15%] sm:py-[5%] text-amber-300  '>
    <div className={`grid grid-cols-1 relative  backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full ${selectedUser ? 'md:grid-cols-[1fr_1.5_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2' }`}>
    <Sidebar />
    <Chatcontainer  />
    <Rightsidebar />
    
    </div>
    </div>

  )
}

export default Homepage