



import { Carrousel } from '../../components/Carrousel';
import { InputForm } from '../../components/InputForm';


export function IntroductionSection() {
    return (

        <div
            className='w-full flex flex-col gap-5 p-2 mt-32 lg:mt-0 lg:h-full text-white font-K2D justify-center items-center'>
            <h2 className='font-bold text-6xl text-left  '>Bem vindo a CF Brasil!</h2>
            <span className='font-bold text-left text-xl '>A Comunidade First Brasileira para divulgação de dúvidas e descobertas!</span>
            <button
                className='font-bold text-xl bg-zinc-600 p-3 rounded-lg'> Prosseguir</button>
        </div>

    )
}

export function LoginSection() {
    return (
        <div className='w-full h-full flex flex-col gap-5 justify-start items-center'>
            <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Faça login para acessar a comunidade!</span>
            <form className='w-4/5 h-32 bg-DF-black rounded-lg text-white font-K2D p-5'>
                <InputForm
                    htmlfor='email'
                    inputType='email'
                    label='E-mail'
                    placeholder='Digite seu email'
                />
            </form>
        </div>
    )
}