import { createContext, useContext } from "react";


interface User {
    id: number;
    name: string;
    image: string
}

interface UserContextType {
    user : User
}

const defaultUser : User = {
    id : 0,
    name: 'user',
    image: 'null'
}

export const UserContext =  createContext<UserContextType>({user : defaultUser})

const UserManager = ({children}) => {
    return (<UserContext.Provider value={{user : defaultUser }}>
        {children}
    </UserContext.Provider>);
}

export default UserManager;