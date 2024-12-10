import useConversation from '../zustand/userConversation'
import toast from 'react-hot-toast'
import axios from 'axios'

const useSendMessage = () => {
    const {messages,setMessages,selectedConversation} = useConversation()

    const sendMessage = async (message,token) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/messages/send/${selectedConversation._id}`,{token,message})
            if(res.error) throw new Error(res.error)
            setMessages([...messages.data,res.data])
        } catch (error) {  
            toast.error(error.message)
        }
    }
    return {sendMessage}
} 
export default useSendMessage