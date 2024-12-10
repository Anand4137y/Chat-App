import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import { userAuthContext } from '../../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthuser } = userAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validate = validation(username, password);
      if (validate) {
        let data = { username, password };
        const response = await axios.post('http://localhost:5000/api/auth/login', data);
        localStorage.setItem('chat-user', JSON.stringify(response))
        document.cookie = `jwt = ${response.data.token};path='/'; samesite=strict`
        setAuthuser(response)
        toast.success("Login Successfully")

      } else {
        toast.error('Validation failed');
      }
    } catch (error) {
      if (error.response) {
        console.log(error)
        toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  }

  const validation = (username, password) => {
    if (!username || !password) {
      toast.error('All fields required')
    }
    return true
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter Username' className='input input-bordered input-info w-full max-w-xs'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className='input input-bordered input-info w-full max-w-xs'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Don't have an account?
          </Link>
          <div>
            <button className='input input-bordered input-info w-full max-w-xs'>Login</button>
          </div>
        </form>


      </div>

    </div>
  )
}

export default Login