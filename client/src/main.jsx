import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Authprovider } from '../context/Authcontext.jsx'
import { ChatProvider } from '../context/chatcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authprovider>
    <ChatProvider>
    <App />
    </ChatProvider>
  </Authprovider>
  </BrowserRouter>
)
