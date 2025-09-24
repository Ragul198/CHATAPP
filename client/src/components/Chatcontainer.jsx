import React, { useEffect, useRef, useLayoutEffect, useContext ,useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/chatcontext';
import { Authcontext } from '../../context/Authcontext';
import toast from 'react-hot-toast';

const Chatcontainer = () => {
  const {sendMessage,getMessages,messages,selectedUser, setSelectedUser} =useContext(ChatContext);
  const {authUser,onlineUsers} =useContext(Authcontext);
  const scrollEnd = useRef();
  const [input, setInput] = useState('');

  // handle send message
  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(input.trim() === '') return;
    await sendMessage({text:input.trim()});
    setInput('');
  }

  //Handle sending message an image
  const handleSendImage = async (e) => {
    const file =e.target.files[0];
    if(!file || !file.type.startsWith('image/')){
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      await sendMessage({image:reader.result});
    }
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  },[selectedUser])
  
  // Ensures scroll triggers after DOM updates
  useLayoutEffect(() => {
    setTimeout(() => {
      if (scrollEnd.current && messages.length > 0) {
        scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }, [messages.length, selectedUser]);

  return selectedUser ? (
    <div className='h-full overflow-hidden relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Header */}
      <div className='flex items-center gap-4 py-4 px-6 border-b border-purple-500/30 bg-slate-800/60 backdrop-blur-lg'>
        <div className='relative'>
          <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-12 h-12 rounded-full border-2 border-purple-400 shadow-lg' />
          {onlineUsers.includes(selectedUser._id) && <span className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-800'></span>}
        </div>
        <div className='flex-1'>
          <p className='text-xl font-semibold text-white'>{selectedUser.fullname}</p>
          <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? 'text-emerald-400' : 'text-gray-400'}`}>
            {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
          </p>
        </div>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden w-8 cursor-pointer hover:bg-slate-700 p-1 rounded-full transition-colors' />
        <img src={assets.help_icon} alt="" className='max-md:hidden w-6 cursor-pointer hover:bg-slate-700 p-1 rounded-full transition-colors' />
      </div>

      {/* Chat Messages */}
      <div className='flex flex-col h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2 max-w-[70%] ${msg.senderId === authUser._id ? 'flex-row-reverse' : 'flex-row'}`}>
              <img 
                src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} 
                alt="" 
                className='w-8 h-8 rounded-full border border-purple-400/50 flex-shrink-0' 
              />
              <div className={`flex flex-col ${msg.senderId === authUser._id ? 'items-end' : 'items-start'}`}>
                {msg.image ? (
                  <img 
                    src={msg.image} 
                    alt="" 
                    className='max-w-[280px] rounded-2xl border border-purple-400/30 shadow-lg hover:shadow-xl transition-shadow cursor-pointer' 
                    onClick={() => window.open(msg.image)}
                  />
                ) : (
                  <div className={`px-4 py-3 rounded-2xl shadow-lg max-w-[350px] ${
                    msg.senderId === authUser._id 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md' 
                      : 'bg-slate-700/80 text-gray-100 rounded-bl-md'
                  }`}>
                    <p className='text-sm font-medium break-words'>{msg.text}</p>
                  </div>
                )}
                <p className='text-xs text-gray-400 mt-1 px-1'>{formatMessageTime(msg.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input area */}
      <div className='absolute bottom-0 right-0 left-0 p-4 bg-slate-800/60 backdrop-blur-lg border-t border-purple-500/30'>
        <div className='flex items-center gap-3 bg-slate-700/50 rounded-full p-2 border border-purple-500/30 shadow-lg'>
          <div className='flex-1 flex items-center px-4'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              onKeyDown={(e) => e.key === 'Enter'? handleSendMessage(e):null } 
              type="text" 
              placeholder='Type your message...' 
              className='flex-1 bg-transparent text-white placeholder-gray-400 outline-none py-3 text-sm font-medium' 
            />
            <input onChange={handleSendImage} type="file" accept='image/png, image/jpeg' hidden id='image' />
            <label htmlFor='image' className='cursor-pointer p-2 hover:bg-purple-600/30 rounded-full transition-colors'>
              <img src={assets.gallery_icon} alt="" className='w-6 h-6' />
            </label>
          </div>
          <button 
            onClick={handleSendMessage} 
            className='bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl'
          >
            <img src={assets.send_button} alt="" className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 max-md:hidden'>
      <div className='text-center space-y-6'>
        <div className='w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl'>
          <img src={assets.logo_icon} alt="" className='w-12 h-12' />
        </div>
        <div className='space-y-2'>
          <p className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
            Welcome to ChatApp
          </p>
          <p className='text-gray-400 text-sm'>Select a conversation to start chatting</p>
        </div>
      </div>
    </div>
  );
};

export default Chatcontainer;
