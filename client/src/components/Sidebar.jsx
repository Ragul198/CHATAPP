import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../../context/Authcontext'
import { ChatContext } from '../../context/chatcontext'

const Sidebar = () => {
  const {getUsers,selectedUser,setSelectedUser,users,unseenMessages,setUnseenMessages}=useContext(ChatContext);
  const{logout,onlineUsers}=useContext(Authcontext);
  const [input ,setInput]=useState('');
  const navigate = useNavigate();
  const filteredUsers = input ?users.filter((user) => user.fullname.toLowerCase().includes(input.toLowerCase())):users;
  
  useEffect(() => {
    getUsers();
  },[onlineUsers])

  return (
    <div className={`bg-gradient-to-b from-slate-800 to-slate-900 h-full rounded-l-2xl overflow-hidden text-white ${selectedUser ? 'max-md:hidden' :""}`}>
      {/* Header Section */}
      <div className='p-6 border-b border-purple-500/30'>
        <div className="flex justify-between items-center mb-6">
          <img src={assets.logo} alt="logo" className='max-w-32 brightness-110'/>
          <div className='relative group'>
            <div className='w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all'>
              <img src={assets.menu_icon} alt="menu" className='w-5 h-5'/>
            </div>
            <div className="absolute top-full right-0 mt-2 z-20 w-40 p-3 rounded-xl bg-slate-700/90 backdrop-blur-lg border border-purple-500/30 shadow-xl hidden group-hover:block">
              <p className='cursor-pointer text-sm py-2 px-3 hover:bg-purple-600/30 rounded-lg transition-colors' onClick={() => navigate('/profile')}>
                Edit Profile
              </p>
              <div className='h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-1'></div>
              <p className='cursor-pointer text-sm py-2 px-3 hover:bg-red-600/30 rounded-lg transition-colors text-red-400' onClick={()=>logout()}>
                Log Out
              </p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className='relative'>
          <div className='bg-slate-700/50 rounded-full flex items-center gap-3 py-3 px-4 border border-purple-500/30 shadow-inner'>
            <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-70' />
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Search conversations...' 
              className="bg-transparent outline-none border-none text-white text-sm placeholder-gray-400 flex-1 font-medium" 
            />
          </div>
          {input && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400'>
              {filteredUsers.length} found
            </div>
          )}
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col p-4 space-y-2 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user,index) => (
            <div 
              key={index} 
              onClick={() => {setSelectedUser(user);setUnseenMessages(prev=>({...prev,[user._id]:0}))}} 
              className={`relative flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 group hover:shadow-lg ${
                selectedUser?._id === user._id 
                  ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-400/50 shadow-lg' 
                  : 'hover:bg-slate-700/30 border border-transparent'
              }`}
            >
              <div className='relative flex-shrink-0'>
                <img 
                  src={user?.profilePic || assets.avatar_icon} 
                  alt="user" 
                  className='w-12 h-12 rounded-full border-2 border-purple-400/50 group-hover:border-purple-400 transition-colors' 
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                  onlineUsers.includes(user._id) ? 'bg-emerald-400' : 'bg-gray-500'
                }`}></div>
              </div>
              
              <div className='flex flex-col justify-center flex-1 min-w-0'>
                <p className='font-semibold text-white text-sm truncate'>{user.fullname}</p>
                <p className={`text-xs font-medium ${
                  onlineUsers.includes(user._id) ? 'text-emerald-400' : 'text-gray-400'
                }`}>
                  {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                </p>
              </div>
              
              {unseenMessages?.[user._id] > 0 && (
                <div className='absolute top-3 right-3 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg'>
                  <span className='text-white text-xs font-bold'>
                    {unseenMessages[user._id] > 99 ? '99+' : unseenMessages[user._id]}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='text-center py-8 text-gray-400'>
            <p className='text-sm'>No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
