import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export const userAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [authuser, setAuthuser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    return <AuthContext.Provider value={{authuser,setAuthuser}}>
        {children}
    </AuthContext.Provider>
}
export default AuthContextProvider