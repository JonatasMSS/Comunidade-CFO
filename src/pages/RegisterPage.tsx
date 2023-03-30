
import React from 'react';
import MainFoto from '../assets/Principal.jpg';
import { InputForm } from '../components/InputForm';
import { SubmitButton } from '../components/SubmitButton';

export function RegisterPage() {
    return (
        <div className='w-screen h-screen pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>


            {/* Form section */}
            <div className='w-screen min-h-screen flex flex-col items-center'>
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
                    <SubmitButton label='Registrar'/>

                    
                </form>
            </div>


            {/* Image Section */}
            <img src={MainFoto} alt="Foto principal"
                className=' lg:w-1/2 lg:min-h-screen' loading='lazy' />
        </div>
    )
}