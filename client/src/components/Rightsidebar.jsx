import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/chatcontext'
import { Authcontext } from '../../context/Authcontext'

const Rightsidebar = () => {
     const {selectedUser,messages} = useContext(ChatContext);
     const {logout,onlineUsers} = useContext(Authcontext);
     const [msgimages, setMsgImages] = useState([]);

  //get images from messages and set them to state
  useEffect(() => {
    const images = messages.filter((msg) => msg.image).map((msg) => msg.image);
    setMsgImages(images);
  }, [messages]);
  
  return selectedUser && (
    <div className='bg-gradient-to-b from-slate-800 to-slate-900 text-white w-full relative overflow-y-auto border-l border-purple-500/30'>
      {/* Profile Section */}
      <div className='pt-8 pb-6 flex flex-col items-center gap-4 px-6'>
        <div className='relative'>
          <img 
            src={selectedUser?.profilePic || assets.avatar_icon} 
            alt="" 
            className='w-24 h-24 rounded-full border-4 border-purple-400 shadow-xl' 
          />
          <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-slate-800 ${
            onlineUsers.includes(selectedUser._id) ? 'bg-emerald-400' : 'bg-gray-500'
          }`}></div>
        </div>
        
        <div className='text-center space-y-2'>
          <h1 className='text-xl font-bold text-white'>
            {selectedUser?.fullname}
          </h1>
          <p className={`text-sm font-medium ${
            onlineUsers.includes(selectedUser._id) ? 'text-emerald-400' : 'text-gray-400'
          }`}>
            {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
          </p>
          {selectedUser?.bio && (
            <p className='text-sm text-gray-300 max-w-xs mx-auto leading-relaxed'>
              {selectedUser?.bio}
            </p>
          )}
        </div>
      </div>
      
      <div className='h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-6'></div>

      {/* Media Section */}
      <div className='p-6 space-y-4'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full'></div>
          <h3 className='text-lg font-semibold text-white'>Media Files</h3>
        </div>
        
        {msgimages.length > 0 ? (
          <div className='grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto'>
            {msgimages.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url)} 
                className='relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
              >
                <img 
                  src={url} 
                  alt="" 
                  className='w-full h-24 object-cover group-hover:brightness-75 transition-all duration-300' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <span className='text-white text-xs'>↗</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-8 text-gray-400'>
            <p className='text-sm'>No media files shared yet</p>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button 
        onClick={() => logout()} 
        className='absolute bottom-6 left-1/2 transform -translate-x-1/2 
                   bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700
                   text-white border-none text-sm font-semibold 
                   py-3 px-8 rounded-full cursor-pointer shadow-lg hover:shadow-xl
                   transition-all duration-300 transform hover:scale-105'
      >
        Logout
      </button>
    </div>
  )
}

export default Rightsidebar
