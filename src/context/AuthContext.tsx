import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { FB_Auth } from "../routes/firebase_app";
import UserModel from "../models/user_model";
import { TestRequisition } from "../lib/testRequistions";




export const AuthContext = createContext<UserModel | null>(null)


interface IAuthProvider {
    child: JSX.Element;
}
export function AuthProvider({ child }: IAuthProvider) {

    const [userC, setUser] = useState<UserModel | null>(null)
    const [quant, setQuant] = useState(0);

    useEffect(() => {
        // onAuthStateChanged(FB_Auth, (user) => {
        //     TestRequisition('OnAuthStateChanged');
        //     if (user && !userC) {
        //         GetUserData(user!.email).then((userExtraData) => {
        //             TestRequisition('GetUserData on AuthStateChanged');
        //             //Coleto os User's no firestore
        //             const userData = userExtraData;

        //             //Defino o usuário com o model
        //             setUser(userData);
        //         }).catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;

        //             console.log(`Algo deu errado ao mudar OAuth. Erro Code:${errorCode}. Message:${errorMessage}`)
        //         })
        //     }
        //     else {
        //         setUser(null)
        //     }


        // })
    }, [FB_Auth])

    return (
        <AuthContext.Provider value={userC}>
            {child}
        </AuthContext.Provider>
    )
}