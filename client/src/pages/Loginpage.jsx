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
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl flex items-center justify-center gap-12 max-lg:flex-col'>
        
        {/* Left Side - Logo */}
        <div className='text-center space-y-6'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-2xl opacity-20 scale-110'></div>
            <img src={assets.logo_big} alt="logo" className='relative w-64 max-w-[min(40vw,280px)] drop-shadow-2xl'/>
          </div>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
              ChatApp
            </h1>
            <p className='text-gray-400 text-lg'>Connect with friends instantly</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full max-w-md'>
          <form onSubmit={onSubmitHandler} className='bg-slate-800/60 backdrop-blur-xl border border-purple-500/30 p-8 rounded-2xl shadow-2xl space-y-6'>
            
            {/* Header */}
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-white'>
                {currenState === 'signup' ? 'Create Account' : 'Welcome Back'}
              </h2>
              {isDatasubmited && (
                <button 
                  type="button"
                  onClick={() => setIsDatasubmited(false)} 
                  className='w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors flex items-center justify-center'
                >
                  <img src={assets.arrow_icon} alt="back" className='w-5 h-5' />
                </button>
              )}
            </div>

            {/* Progress Indicator for Signup */}
            {currenState === 'signup' && (
              <div className='flex items-center gap-2'>
                <div className={`h-1 flex-1 rounded-full ${!isDatasubmited ? 'bg-purple-600' : 'bg-slate-600'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${isDatasubmited ? 'bg-purple-600' : 'bg-slate-600'}`}></div>
              </div>
            )}

            {/* Step 1 Fields */}
            {!isDatasubmited && (
              <div className='space-y-4'>
                {currenState === 'signup' && (
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-300'>Full Name</label>
                    <input 
                      onChange={(e) => setfullname(e.target.value)} 
                      value={fullname} 
                      type="text" 
                      className='w-full p-4 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all' 
                      placeholder='Enter your full name' 
                      required 
                    />
                  </div>
                )}
                
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>Email</label>
                  <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    type="email" 
                    className='w-full p-4 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all' 
                    placeholder='Enter your email' 
                    required 
                  />
                </div>
                
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>Password</label>
                  <input 
                    onChange={(e) => setpassword(e.target.value)} 
                    value={password}  
                    type="password" 
                    className='w-full p-4 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all' 
                    placeholder='Enter your password' 
                    required 
                  />
                </div>
              </div>
            )}

            {/* Step 2 Fields */}
            {currenState === 'signup' && isDatasubmited && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>Bio</label>
                  <textarea 
                    onChange={(e) => setBio(e.target.value)} 
                    value={bio} 
                    rows={4} 
                    className='w-full p-4 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none' 
                    placeholder='Tell us about yourself...' 
                    required 
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type='submit' 
              className='w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
            >
              {currenState === 'signup' 
                ? (isDatasubmited ? 'Create Account' : 'Continue') 
                : 'Sign In'
              }
            </button>

            {/* Terms */}
            <div className='flex items-start gap-3 text-sm text-gray-400'>
              <input type="checkbox" required className='mt-0.5' />
              <p>I agree to the <span className='text-purple-400 hover:underline cursor-pointer'>Terms of Service</span> and <span className='text-purple-400 hover:underline cursor-pointer'>Privacy Policy</span></p>
            </div>

            {/* Toggle Auth Mode */}
            {!isDatasubmited && (
              <div className='text-center pt-4 border-t border-slate-700'>
                {currenState === "signup" ? (
                  <p className='text-gray-400'>
                    Already have an account? 
                    <button 
                      type="button"
                      className='ml-2 font-semibold text-purple-400 hover:text-purple-300 transition-colors' 
                      onClick={() => setCurrentState('login')}
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p className='text-gray-400'>
                    Don't have an account? 
                    <button 
                      type="button"
                      className='ml-2 font-semibold text-purple-400 hover:text-purple-300 transition-colors' 
                      onClick={() => setCurrentState('signup')}
                    >
                      Sign Up
                    </button>
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
