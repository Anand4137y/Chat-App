import React from 'react'
import { AiOutlineSend } from "react-icons/ai";
import useSendMessage from '../../hooks/useSendMessage';
import { useState } from 'react';

function MessageInput() {
  const [message,setMessage] = useState('')
  const {sendMessage} = useSendMessage()

  const token = document.cookie.slice(4).toString()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!message) return
    sendMessage(message,token)
    setMessage('')
  }


  return (
<form className='px-4 my-3' 
onSubmit={handleSubmit}
>
    <div className='w-full relative'>
        <input type="text"
        className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
        placeholder='Send a Message'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            <AiOutlineSend/>
        </button>
    </div>

</form>
  )
}

export default MessageInput