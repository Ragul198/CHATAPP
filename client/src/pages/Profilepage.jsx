import React from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../../context/Authcontext'
import { useContext } from 'react'

const Profilepage = () => {
  const {authUser,updateProfile}=useContext(Authcontext)
  const [selectedimg, setSelectedimg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullname)
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState(authUser.bio)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    if(!selectedimg){
      await updateProfile({fullname:name,bio})
      setLoading(false);
      navigate('/')
      return;
    }
    const reader = new FileReader()
    reader.readAsDataURL(selectedimg)
    reader.onload = async () => {
      try{
      const image = reader.result
      await updateProfile({profilepic:image,fullname:name,bio})
      setLoading(false);
      navigate('/')
      }catch(error){
        console.log(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-slate-800/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden'>
        
        {/* Header */}
        <div className='bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 border-b border-purple-500/30'>
          <div className='flex items-center gap-4'>
            <button 
              onClick={() => navigate('/')}
              className='w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors flex items-center justify-center'
            >
              <span className='text-white text-lg'>←</span>
            </button>
            <div>
              <h1 className='text-2xl font-bold text-white'>Edit Profile</h1>
              <p className='text-gray-400'>Update your profile information</p>
            </div>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-8 p-8'>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Profile Image Upload */}
            <div className='space-y-4'>
              <label className='block text-sm font-medium text-gray-300'>Profile Picture</label>
              <label htmlFor="avatar" className='group cursor-pointer'>
                <div className='flex items-center gap-4 p-4 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-colors bg-slate-700/30'>
                  <div className='relative'>
                    <img 
                      src={selectedimg ? URL.createObjectURL(selectedimg) : assets.avatar_icon} 
                      alt="profile" 
                      className='w-16 h-16 rounded-full border-2 border-purple-400/50 group-hover:border-purple-400 transition-colors object-cover' 
                    />
                    <div className='absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <span className='text-white text-xs'>Edit</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-white font-medium'>Upload Profile Image</p>
                    <p className='text-gray-400 text-sm'>PNG, JPG or JPEG (Max 5MB)</p>
                  </div>
                </div>
                <input onChange={(e) => setSelectedimg(e.target.files[0])} type="file" id="avatar" accept='.png,.jpg,.jpeg' hidden />
              </label>
            </div>

            {/* Name Input */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-300'>Full Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                type="text" 
                required 
                placeholder='Enter your name' 
                className='w-full p-4 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all' 
              />
            </div>

            {/* Bio Textarea */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-300'>Bio</label>
              <textarea 
                name="bio" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder='Tell us about yourself...' 
                className='w-full p-4 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none' 
                rows={4} 
              />
            </div>

            {/* Save Button */}
            <button 
              disabled={loading} 
              type='submit' 
              className='w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
            >
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>

          {/* Preview Section */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-lg font-medium text-gray-300'>Preview</h3>
              <p className='text-gray-400 text-sm'>How others will see your profile</p>
            </div>
            
            <div className='bg-slate-700/30 rounded-xl p-6 border border-purple-500/30'>
              <div className='text-center space-y-4'>
                <div className='relative w-32 h-32 mx-auto'>
                  <img 
                    src={selectedimg ? URL.createObjectURL(selectedimg) : authUser.profilePic || assets.logo_icon} 
                    alt="preview" 
                    className='w-full h-full rounded-full border-4 border-purple-400/50 object-cover shadow-xl' 
                  />
                  <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full border-4 border-slate-700'></div>
                </div>
                
                <div className='space-y-2'>
                  <h4 className='text-xl font-bold text-white'>{name || 'Your Name'}</h4>
                  <p className='text-emerald-400 text-sm font-medium'>Online</p>
                  {bio && <p className='text-gray-300 text-sm leading-relaxed'>{bio}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilepage
