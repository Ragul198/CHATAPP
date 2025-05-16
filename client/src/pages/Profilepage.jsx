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
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center '>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-500  flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avatar" className='  w-60 flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setSelectedimg(e.target.files[0])} type="file"  id="avatar" accept='.png,.jpg,.jpeg' hidden />
            <img src={selectedimg?URL.createObjectURL(selectedimg):assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedimg && 'rounded-full'}`}/>
            Upload Profile Image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" required placeholder='Your Name' className=' p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Write Your Bio...' className=' p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ' rows={4} ></textarea>
          <button disabled={loading} type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-lg font-light p-2  rounded-full cursor-pointer'>{loading ? "Saving..." : "Save"}</button>
        </form>
        <img src={authUser.profilePic?authUser.profilePic:assets.logo_icon} alt="" className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedimg && 'rounded-full'}`} />
        
      </div>

    </div>
  )
}

export default Profilepage