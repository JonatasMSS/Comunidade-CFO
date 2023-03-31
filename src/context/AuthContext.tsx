import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import FB_Auth from "../routes/firebase_auth";



export const AuthContext = createContext<User | null>(null)


interface IAuthProvider{
    child: JSX.Element;
}
export function AuthProvider({child}:IAuthProvider){

    const [user,setUser] = useState<User | null>(null)

    onAuthStateChanged(FB_Auth,user => {
    
        setUser(user);
    })

    return (
        <AuthContext.Provider value={user}>
            {child}
        </AuthContext.Provider>
    )
}