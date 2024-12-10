import useConversation from '../zustand/userConversation'
import {userSocketContext} from '../context/SocketContext'
import { useEffect } from 'react'

const useListenMessage = () => {
    const {socket} = userSocketContext()
    const {messages,setMessages} = useConversation()

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages.data,newMessage])
        })
        return ()=> socket?.off('newMessage')
    },[socket,setMessages,messages])
}
export default useListenMessage