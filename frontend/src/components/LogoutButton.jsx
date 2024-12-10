import React from 'react'
import { TbLogout2 } from "react-icons/tb";import axios from 'axios';
import { userAuthContext } from '../context/AuthContext';
function LogoutButton() {
  const {setAuthuser} = userAuthContext()
  const logout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout')
    .then((res)=>{
      localStorage.removeItem('chat-user')
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; sameSite=strict; secure=false'
      setAuthuser(null)
    })
  }
  return (
    <div className='mt-auto'>
      <TbLogout2 onClick={()=>logout()}/>
      </div>
  )
}

export default LogoutButton