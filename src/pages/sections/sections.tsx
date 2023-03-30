import { Link } from "react-router-dom";

export function IntroductionSection() {
    return (

        <div
            className='w-full  flex flex-col gap-5 p-2 mt-32 lg:mt-0 lg:h-full text-white font-K2D justify-center items-center'>
            <h2 className='font-bold text-6xl text-left  '>Bem vindo a CF Brasil!</h2>
            <span className='font-bold text-left text-xl '>A Comunidade First Brasileira para divulgação de dúvidas e descobertas!</span>
            <button
                className='font-bold text-xl bg-zinc-600 p-3 rounded-lg'><Link to={'login'}>Prosseguir</Link></button>
        </div>

    )
}
