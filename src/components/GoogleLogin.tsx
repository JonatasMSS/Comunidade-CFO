
import Google from '../assets/GoogleSimbolo.svg';


export function GoogleLogin(){
    return(
        <button className='w-full p-2 rounded-lg bg-white flex text-black  font-semibold items-center justify-evenly sm:justify-center sm:gap-5'><img src={Google} alt="..." /> Entrar com o google</button>
    )
}