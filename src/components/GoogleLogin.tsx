
import { GoogleAuthProvider, browserSessionPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import Google from '../assets/GoogleSimbolo.svg';
import FB_Auth from '../routes/firebase_auth';
import { useNavigate } from 'react-router-dom';
import { SignInWithGoogle } from '../controllers/firebase_auth_controller';
import { useMediaQuery } from 'react-responsive';
import { GetUserData } from '../controllers/firebase_controller';


interface IGoogleLogin {
    loaderState?: React.Dispatch<React.SetStateAction<boolean>>; //Caso tenha algum loader na página, muda o estado desse
}


export function GoogleLogin({ loaderState }: IGoogleLogin) {

    const navigate = useNavigate()


    const handleLogin = async () => {
       
        try {
            loaderState?.(true);
            await SignInWithGoogle(browserSessionPersistence);
            loaderState?.(false);
            navigate('/googlesignin');

        } catch (error) {
            console.log(error);
            alert(`Aconteceu um erro na autenticação:${error}`)
            loaderState?.(false);
        }

    }

    return (
        <button
            type='button'
            onClick={handleLogin}
            className='w-full p-2 rounded-lg bg-white flex text-black  font-semibold items-center justify-evenly sm:justify-center sm:gap-5'><img src={Google} alt="..." /> Entrar com o google</button>
    )
}