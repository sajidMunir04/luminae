import { createContext, useEffect, useState } from "react"


interface UserInfo {
    name: string,
    image: string,
    email: string
}

export const UserContext = createContext<UserInfo>({
    name: "",
    image: "",
    email: ""
});


async function UserProvider({chilren}) {
    
    const [activeUser,SetUser] = useState<UserInfo>({
        name: "",
        image: "",
        email: ""
    });

    useEffect(() => {
        
    },[activeUser]);

    return (<UserContext.Provider value={activeUser}>
        {chilren}
    </UserContext.Provider>);
}

export default UserProvider;