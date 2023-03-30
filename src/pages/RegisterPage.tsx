
import React from 'react';
import MainFoto from '../assets/Principal.jpg';
import { InputForm } from '../components/InputForm';
import { SubmitButton } from '../components/SubmitButton';
import { GoogleLogin } from '../components/GoogleLogin';

export function RegisterPage() {
    return (
        <div className='  pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
            {/* Form section */}
            <div className='w-full  flex flex-col items-center'>
                <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Crie sua conta na comunidade!</span>
                <form className='w-4/5 flex flex-col items-center gap-3 bg-DF-black rounded-lg text-white font-K2D p-5 '>
                    <InputForm
                        label='Nome de usuário'
                        htmlfor='nickname'
                        inputType='text'
                        placeholder='Digite um nome de usuário'

                    />
                    <InputForm
                        label='Nome da equipe'
                        placeholder='Equipe da robótica'
                        htmlfor='team'
                        inputType='text'

                    />
                    <InputForm
                        label='Função na equipe'
                        placeholder='Ex.:Programador,engenheiro,redação...'
                        htmlfor='role'
                        inputType='text'
                    />
                    <InputForm
                        label='Digite seu email'
                        htmlfor='email'
                        inputType='email'
                        placeholder='Ex:selenegomes@gmail.com'

                    />
                    <InputForm
                        label='Senha'
                        htmlfor='password'
                        inputType='password'
                        placeholder='Ex:123@abcdefg'
                    />
                    <InputForm
                        label='Confirmar senha'
                        htmlfor='pass_confirm'
                        inputType='password'
                        placeholder='Confirmar senha'
                    />
                    <SubmitButton label='Registrar' />


                    {/* Divisor */}
                    <div className='flex gap-5 w-full items-center justify-center'>
                        <div className='h-0.5 w-full bg-zinc-600' />
                        <span className=' font-bold text-sm'>Ou</span>
                        <div className='h-0.5 w-full bg-zinc-600' />
                    </div>

                    {/* Google login */}

                    <GoogleLogin />

                </form>
            </div>


            {/* Image Section */}
            <div className='w-full h-full flex flex-col'>
                <img src={MainFoto}  alt="Foto principal"
                    loading='lazy' />
            </div>
        </div>
    )
}