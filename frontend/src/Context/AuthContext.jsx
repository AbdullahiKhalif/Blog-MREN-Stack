import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);

    const value = {currentUser, setCurrentUser};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}
export default AuthContextProvider;