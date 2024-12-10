
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import {Toaster} from 'react-hot-toast'
import { userAuthContext } from './context/AuthContext'
function App() {
  const {authuser} = userAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Toaster/>
      <Routes>
        <Route path ='/' element={authuser?<Home/>:<Navigate to={'/login'}/>} />
        <Route path ='/login' element={authuser?<Navigate to='/'/>:<Login/>} />
        <Route path ='/signup' element={authuser?<Navigate to='/'/>:<Signup/>} />
      </Routes>
    </div>
  )
}

export default App
