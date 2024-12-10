import React, { useEffect,useState } from 'react'
import Conversation from './Conversation'
import toast from 'react-hot-toast'
import axios from 'axios'

function Conversations() {

const [conversations,setConversations] = useState([])
  useEffect(()=>{
    const getConversation = async () => {
      try {
        let token = document.cookie.slice(4)
        
        const res = await axios.post("http://localhost:5000/api/users/",{token})
        setConversations(res.data)

        if (res.error) {
          throw new Error(data.error);
				}
      } catch (error) {
        toast.error(error.message)
      }
    }
    getConversation()
  },[])
 
  return (
    <div className='py-2 flex flex-col overflow-auto'>
       {
        conversations.map((conversation,i)=>(
          <Conversation
          key={conversation._id}
          lastIndex = {i === conversations.length-1}
          conversation = {conversation}
          />
        ))
       }
    </div>
  )
}

export default Conversations