import React from 'react'
import { Routes ,Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import Profilepage from './pages/Profilepage'
import assets from './assets/assets'
import {Toaster} from 'react-hot-toast'
import {Authcontext} from '../context/Authcontext'
const App = () => {
  const {authUser} = React.useContext(Authcontext);
  return (
    
    
    <div className="bg-[url('./src/assets/bgImage.svg')]  bg-contain bg-center ">
    <Toaster/>
    <Routes>
      <Route path='/'   element={authUser?<Homepage/>:<Navigate to='/login'/>} ></Route>
      <Route path='/login'   element={!authUser?<Loginpage/>:<Navigate to='/'/>} ></Route>
      <Route path='/profile' element={authUser?<Profilepage/>:<Navigate to='/login'/>}></Route>

    </Routes>
    </div>
    
    
    
  )
}

export default App