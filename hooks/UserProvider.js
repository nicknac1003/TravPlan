import React, { createContext, useContext, useState} from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [trip, setTrip] = useState(null)
    return (
        <UserContext.Provider value={{user, trip, setUser, setTrip}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
  return useContext(UserContext)
}


