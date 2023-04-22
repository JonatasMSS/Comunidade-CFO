import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { FB_Auth } from "../routes/firebase_app";
import UserModel from "../models/user_model";
import { TestRequisition } from "../lib/testRequistions";
import { RTGetUser } from "../controllers/firebase_realtime_database";




export const AuthContext = createContext<UserModel | null | undefined>(null)


interface IAuthProvider {
    child: JSX.Element;
}
export function AuthProvider({ child }: IAuthProvider) {

    const [userC, setUser] = useState<UserModel>()

    useEffect(() => {
        onAuthStateChanged(FB_Auth,(user) => {
            if(user){
                RTGetUser(user.uid)
                .then((userData) =>{
                    setUser(userData)
                }).catch((error) => {
                    console.error(error);
                })
            }
        })

        // })
    }, [FB_Auth])

    return (
        <AuthContext.Provider value={userC}>
            {child}
        </AuthContext.Provider>
    )
}