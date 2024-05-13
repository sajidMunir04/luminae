import { lucia } from "@/auth";
import { User } from "lucia";
import { createContext, useEffect, useState } from "react";

interface UserContextType {
    user: User | undefined
}


export const UserContext = createContext<UserContextType>({
    user: undefined
});


async function UserProvider({children}) {

    const [user,setUser] = useState<User>();
    
    useEffect(() => {
        async function getUser() {
            const sessionId = lucia.readSessionCookie("auth_session=abc");
            const { session, user } = await lucia.validateSession(sessionId as string);

            if (user !== null) {
                setUser(user);
                console.log('user');
            }
        }

        getUser();
    },[])

    return (<UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>);
}

export default UserProvider;