import React, { useState ,useContext } from 'react'
import Chatcontainer from '../components/Chatcontainer'
import Sidebar from '../components/Sidebar'
import Rightsidebar from '../components/Rightsidebar'
import { ChatContext } from '../../context/chatcontext';

const Homepage = () => {
    const {selectedUser} = useContext(ChatContext);
    
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-8'>
        <div className={`
          max-w-7xl mx-auto h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)]
          grid relative backdrop-blur-xl 
          border border-purple-500/30 rounded-3xl overflow-hidden 
          shadow-2xl shadow-purple-900/20
          ${selectedUser ? 'md:grid-cols-[350px_1fr_300px] xl:grid-cols-[380px_1fr_320px]' : 'md:grid-cols-[350px_1fr]'}
        `}>
          <Sidebar />
          <Chatcontainer />
          {selectedUser && <Rightsidebar />}
        </div>
      </div>
    )
}

export default Homepage
