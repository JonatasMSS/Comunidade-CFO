import { GoogleAuthProvider, Persistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
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
    await setPersistence(auth, persistence);
    return await signInWithEmailAndPassword(auth, userData.email, userData.password);
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