import useConversation from '../zustand/userConversation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
const useGetMessages = () => {
    const {messages,setMessages,selectedConversation} = useConversation()
    useEffect(()=>{
        const getMessages = async () => {
            try {
                const token = Cookies.get('jwt')
                const res = await axios.post(`http://localhost:5000/api/messages/${selectedConversation._id}`,{token})
                if(res.error) throw new Error(res.error)
                    await setMessages(res)
            } catch (error) {
                toast.error(error.message)
            }
        }
        if (selectedConversation?._id) getMessages();
    },[selectedConversation?._id, setMessages])
    return {messages}
}

export default useGetMessages