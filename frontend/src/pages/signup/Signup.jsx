import React, { useState } from 'react'
import GenderCheckBox from './genderCheckBox'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userAuthContext } from '../../context/AuthContext'

function Signup() {
  const navigate = useNavigate()
  const {setAuthuser} = userAuthContext()
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })
  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender })
  } 
   

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = validate(inputs)
    if(res){
      await axios.post('http://localhost:5000/api/auth/signup',inputs)
      .then((data)=>JSON.stringify(data))
      .then((response)=>{localStorage.setItem('chat-user',response),setAuthuser(response)})
      .then(()=>toast.success("Signup successfully"))
      .then(()=>navigate('/login'))
      .catch((error)=>console.log(error)
      )
    } 
  }

    
  const validate = (val)=>{
    if(!val.fullName || !val.username || !val.gender || !val.password || !val.confirmPassword){
      return toast.error('All fields required')
    }else if(val.password !== val.confirmPassword){
      return toast.error("passwords doen't match")
    }else 
      return true
        
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-36 mx-auto '>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='Full Name' className='input input-bordered input-info w-full max-w-xs'
              value={inputs.value}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Username' className='input input-bordered input-info w-full max-w-xs'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Password' className='input input-bordered input-info w-full max-w-xs'
              value={inputs.value}
              onChange={((e) => setInputs({ ...inputs, password: e.target.value }))}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder='Confirm Password' className='input input-bordered input-info w-full max-w-xs'
              value={inputs.value}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          {/* gender checkbox */}
          <GenderCheckBox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>
          <div>
            <button className='input input-bordered input-info w-full max-w-xs'>
              Sign UP
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup