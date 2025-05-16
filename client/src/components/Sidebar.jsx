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
  console.log(unseenMessages)
  console.log(users)
  useEffect(() => {
    getUsers();
  },[onlineUsers])
  return (
    <div className={ ` bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' :""}`}>
      <div className='pb-5'>
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className=' max-w-40'/>
          <div className=' relative py-2  group'>
          <img src={assets.menu_icon} alt="logo" className=' max-h-5 cursor-pointer'/>
          <div className=" absolute top-full right-0 z-20 w-34 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
            <p className='cursor-pointer text-sm ' onClick={() => navigate('/profile')}>Edit Profile</p>
            <hr className='my-2 border-t border-gray-500' />
            <p className='cursor-pointer text-sm ' onClick={()=>logout()}>Log Out</p>
          </div>
          </div>
        </div>
        <div className='bg-[#282142] rounded-full flex item-center gap-2 py-3 px-4 mt-5'>
          <img  src={assets.search_icon} alt="search" className='w-3' />
          <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search users...' className="bg-transparent outline-none border-none text-white text-xs placeholder-[#c8c8c8] " />

        </div>

      </div>
      <div className="flex flex-col">
        {filteredUsers.map((user,index)=>(
          <div key={index} onClick={() => {setSelectedUser(user);setUnseenMessages(prev=>({...prev,[user._id]:0}))}} className={`relative flex gap-2 p-2 pl-2 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'} `}>
            <img src={user?.profilePic|| assets.avatar_icon} alt="img" className=' w-[35px] rounded-full aspect-[1/1]' />
            <div className='flex flex-col leading-5'>
              <p>{user.fullname}</p>
              {
                onlineUsers.includes(user._id) ? <span className='text-green-400 text-sm'>Online</span> : <span className='text-neutral-400 text-sm'>Offline</span>
              }
            </div>
            {unseenMessages?.[user._id] > 0 && <p className=' absolute top-4 right-4 h-5 w-5  flex items-center justify-center rounded-full bg-violet-500/50 '>{unseenMessages?.[user._id]}</p>}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar