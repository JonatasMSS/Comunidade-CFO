import { GoogleAuthProvider, Persistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import FB_Auth from "../routes/firebase_auth";



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
export async function SingInWithGoogle(persistence: Persistence = browserSessionPersistence) {
    const google_provider = new GoogleAuthProvider();
    await setPersistence(FB_Auth, persistence);
    const userCredentials = await signInWithPopup(FB_Auth, google_provider);
    
}