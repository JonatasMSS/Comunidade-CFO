import { GoogleAuthProvider, Persistence, browserSessionPersistence, createUserWithEmailAndPassword, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import FB_Auth from "../routes/firebase_auth";
import { CreateUserInFirestore } from "./firebase_controller";
import UserModel from "../models/user_model";



interface ISignIn {
    email: string;
    password: string;
    persistence: Persistence;

}

export async function SignIn({ persistence, ...userData }: ISignIn) {
    try {
        const auth = FB_Auth;
        if (auth.currentUser!.emailVerified) {
            await setPersistence(auth, persistence);
            return await signInWithEmailAndPassword(auth, userData.email, userData.password);
        } else {
            alert('Parece que seu email ainda não foi verificado. Por favor, verifique-o');
        }


    } catch (error) {
        console.log(`Something's wrong with SignIn function: ${error}`)
    }
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
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredentials) => {
            const userModelfromCredentials = new UserModel({
                email: userCredentials.user.email ?? 'noemail@gmail.com',
                name: userCredentials.user.displayName ?? 'noname',
                UID: userCredentials.user.uid,
                role: userData.role,
                team: userData.team
            })

            //Cria um usuário no firestore com dados adicionais
            CreateUserInFirestore(userModelfromCredentials)
                .then(()=>{

                    //Depois de criado, envia um email de verificação ao user

                    if(auth.currentUser){
                        sendEmailVerification(auth.currentUser)
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(`Something's wrong when tried to register an user in Firestore\ncode:${errorCode}\nmessage:${errorMessage}`)
                })


        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Something's wrong when tried call function CreateUserWithEmailPassword\nCode:${errorCode}\nmessage:${errorMessage}`)

        });
}