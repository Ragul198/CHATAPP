import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { Authcontext } from '../../context/Authcontext'
import { useNavigate } from 'react-router-dom'
const Loginpage = () => {
  const [currenState, setCurrentState] = useState('signup')
  const [fullname, setfullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDatasubmited, setIsDatasubmited] = useState(false)

  const navigate = useNavigate()
  const{login}= useContext(Authcontext)
  const loginhandler=async()=>{
    await login(currenState==='signup'?'signup':'login',{fullname,email,password,bio})
    window.location.reload();
  }
  const onSubmitHandler =(event)=>{
    event.preventDefault();
    if(currenState==="signup" && !isDatasubmited){

      setIsDatasubmited(true)
      return;
    }
    loginhandler()
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

    {/* --- left --- */}
    <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>

    {/* --- right --- */}
    
    <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6  rounded-lg shadow-lg'>
    <h2 className='font-medium text-2xl flex justify-between items-center'>
      {currenState === 'signup' ? 'Sign Up' : 'Login'}
      {isDatasubmited && (<img onClick={() => setIsDatasubmited(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />)}
   
      </h2>
      {currenState==='signup'
       && !isDatasubmited &&
       ( <input onChange={(e) => setfullname(e.target.value)} value={fullname} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />) 
      }
      {!isDatasubmited && (
        <>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indogo-500' placeholder='Email' required />

         <input onChange={(e) => setpassword(e.target.value)} value={password}  type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indogo-500' placeholder='password' required />
        </>
      )}
      {currenState === 'signup' && isDatasubmited && (
        <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} id="" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indogo-500 ' placeholder='Provide a short bio...' required ></textarea>
      ) }

      <button type='submit' className='py-3  bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursorpointer'>{currenState==='signup' ? 'Create Account' : 'LOGIN'}</button>
      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <input type="checkbox" required  />
        <p>Agree to the terms of use & privacy policy.</p>
      </div>
      {!isDatasubmited && (
        <>
        
         <div className='flex flex-col gap-2'>
      {currenState==="signup" ?(
        <p>Already have an account?<span className=' font-medium text-indigo-500 cursor-pointer' onClick={() => setCurrentState('login')}> Login</span></p>
      ):(
        <p>Create an account?<span className='font-medium text-indigo-500 cursor-pointer' onClick={() => setCurrentState('signup')}> Sign Up</span></p>

      )}
      </div>
      </>
      )}
     
    </form>
    </div>
  )
}

export default Loginpage