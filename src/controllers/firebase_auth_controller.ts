import { GoogleAuthProvider, Persistence, browserSessionPersistence, createUserWithEmailAndPassword, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import FB_Auth from "../routes/firebase_auth";
import { CreateUserInFirestore, GetUserData } from "./firebase_controller";
import UserModel from "../models/user_model";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



interface ISignIn {
    email: string;
    password: string;
    persistence: Persistence;

}

export async function SignIn({ persistence, ...userData }: ISignIn) {


    const auth = FB_Auth;
    await setPersistence(auth, persistence);
    return await signInWithEmailAndPassword(auth, userData.email, userData.password);


}
export async function SignInWithGoogle(persistence: Persistence = browserSessionPersistence) {
    try {
        const google_provider = new GoogleAuthProvider();

        await setPersistence(FB_Auth, persistence);
        const userCredentials = await signInWithPopup(FB_Auth, google_provider);
        const userModelFromCredentials = new UserModel({
            email: userCredentials.user.email ?? 'noemail@gmail.com',
            name: userCredentials.user.displayName ?? 'noname',
            UID: userCredentials.user.uid,
            role: 'norole',
            team: 'noteam '
        })
        await CreateUserInFirestore(userModelFromCredentials)


    } catch (error) {
        console.log(`Is something wrong when SignIn with google:\n${error}`)
    }

}



interface IUserRegister {
    name: string,
    team: string,
    role: string,
    email: string,
    password: string,

}

export async function RegisterUser(userData: IUserRegister) {
    const auth = FB_Auth;
    const verifyEmailInFirestore = await GetUserData(userData.email);
    if(verifyEmailInFirestore){
        throw "Esse email já existe no banco de dados"
    }
    await setPersistence(auth, browserSessionPersistence);
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(async (userCredentials) => {
            const userModelfromCredentials = new UserModel({
                email: userCredentials.user.email ?? 'noemail@gmail.com',
                name: userData.name,
                UID: userCredentials.user.uid,
                role: userData.role,
                team: userData.team
            })

            //Cria um usuário no firestore com dados adicionais
           await CreateUserInFirestore(userModelfromCredentials);
            

        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Something's wrong when tried call function CreateUserWithEmailPassword\nCode:${errorCode}\nmessage:${errorMessage}`)

        });
}