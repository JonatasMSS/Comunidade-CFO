


import MainFoto from '../../assets/Principal.jpg';
import { Carrousel } from '../../components/Carrousel';


export function IntroductionSection() {
    return (
        <>
            {/* Text section */}
            <div
                className='w-full flex flex-col gap-5 p-2 mt-32 lg:mt-0 lg:h-full text-white font-K2D justify-center items-center'>
                <h2 className='font-bold text-6xl text-left  '>Bem vindo a CFO Brasil!</h2>
                <span className='font-bold text-left text-xl '>A Comunidade First e OBR Brasileira para divulgação de dúvidas e descobertas!</span>
                <button
                    className='font-bold text-xl bg-zinc-600 p-3 rounded-lg'> Prosseguir</button>
            </div>

            {/* Image Section */}
            <img src={MainFoto} alt="Foto principal"
                className='absolute inset-0 lg:relative lg:w-1/2 lg:h-full' loading='lazy' />


        </>
    )
}