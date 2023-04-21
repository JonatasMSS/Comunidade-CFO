import { GoogleAuthProvider, Persistence, browserSessionPersistence, createUserWithEmailAndPassword, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { FB_Auth } from "../routes/firebase_app";
import { CreateUserInFirestore, GetUserData } from "./firebase_controller";
import UserModel from "../models/user_model";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";
import { EmailNotVerified } from "../errors/EmailNotVerified";



interface ISignIn {
    email: string;
    password: string;
    persistence: Persistence;

}

export async function SignIn({ persistence, ...userData }: ISignIn) {

    const auth = FB_Auth;

    //Tratamento de erros
    if (!auth.currentUser?.emailVerified && auth.currentUser?.uid) {
        throw new EmailNotVerified('Email não foi verificado');
    }


    await setPersistence(auth, persistence);
    return await signInWithEmailAndPassword(auth, userData.email, userData.password);


}
export async function SignInWithGoogle(persistence: Persistence = browserSessionPersistence) {

    const auth = FB_Auth;
    const google_provider = new GoogleAuthProvider();
    //Define a persistencia de dados para apenas sessão
    await setPersistence(auth, persistence);
    //Busca as credenciais a partir de uma pop up de login do google
    const userCredentials = await signInWithPopup(FB_Auth, google_provider);

    //Verificar se a o user já existe no Firestore
    const verifyUserInFirestore = await GetUserData(userCredentials.user.email);


    if (!verifyUserInFirestore) {
        const userModelFromCredentials = new UserModel({
            email: userCredentials.user.email ?? 'noemail@gmail.com',
            name: userCredentials.user.displayName ?? 'noname',
            UID: userCredentials.user.uid,
            role: 'norole',
            team: 'noteam '
        })
        await CreateUserInFirestore(userModelFromCredentials)
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

    //Verificar se o email existe
    if (verifyEmailInFirestore) {
        throw new EmailAlreadyExistsError('Esse email já está em uso')
    }

    //Muda a persistencia do auth
    await setPersistence(auth, browserSessionPersistence);


    createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(async (userCredentials) => {


            const userModelfromCredentials = new UserModel({
                email: userCredentials.user.email ?? 'noemail@gmail.com',
                name: userData.name,
                UID: userCredentials.user.uid,
                role: userData.role,
                team: userData.team,

            })

            //Envia email de verificação
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser)
            }

            //Cria um usuário no firestore com dados adicionais
            await CreateUserInFirestore(userModelfromCredentials);


        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Something's wrong when tried call function CreateUserWithEmailPassword\nCode:${errorCode}\nmessage:${errorMessage}`)

        });
}