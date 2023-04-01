import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import FB_Auth from "../routes/firebase_auth";
import UserModel from "../models/user_model";
import { GetUserData } from "../controllers/firebase_controller";


export const AuthContext = createContext<UserModel | null>(null)


interface IAuthProvider {
    child: JSX.Element;
}
export function AuthProvider({ child }: IAuthProvider) {

    const [user, setUser] = useState<UserModel | null>(null)

    onAuthStateChanged(FB_Auth, (user) => {
        if (user) {
            GetUserData(user.uid).then((userExtraData) => {
                //Coleto os User's no firestore
                const userData = userExtraData;
               
                //Defino o usuário com o model
                setUser(userData);


            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(`Algo deu errado ao mudar OAuth. Erro Code:${errorCode}. Message:${errorMessage}`)
            })
        }
        else {
            setUser(null)
        }


    })

    return (
        <AuthContext.Provider value={user}>
            {child}
        </AuthContext.Provider>
    )
}