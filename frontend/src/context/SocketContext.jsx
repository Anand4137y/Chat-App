import { createContext } from "react";
import { userAuthContext } from "./AuthContext";
import io from 'socket.io-client'
import { useState,useEffect,useContext } from "react";

 const SocketContext = createContext()

export const userSocketContext = () => {
    return useContext(SocketContext )
}


export const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const {authuser} = userAuthContext()

    useEffect(()=>{
        if(authuser){
            const socket = io('http://localhost:5000',{
                query:{
                    userId: authuser.data._id
                }
            })
            setSocket(socket)

            socket.on('getOnlineUsers',(users)=>{
                setOnlineUsers(users)
            })

            return ()=>socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authuser])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}