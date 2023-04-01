
import React, { useState } from 'react';
import MainFoto from '../assets/Principal.jpg';
import { InputForm } from '../components/InputForm';
import { SubmitButton } from '../components/SubmitButton';
import { GoogleLogin } from '../components/GoogleLogin';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Loader } from '../components/Loader';

export function RegisterPage() {

    const [isLoading, setLoading] = useState(false);

    //Form validator
    const validatorSchema = yup.object().shape({
        nickname: yup.string().required('É preciso de um nome'),
        team: yup.string().required('Informe o nome de sua equipe'),
        role: yup.string().required('Informe sua função na equipe'),
        email: yup.string().email('Informe um email valido').required('Email requerido'),
        password: yup.string().required('Senha requerida').min(6, 'No mínimo 6 caracteres'),
        pass_confirm: yup.string().required('Confirme sua senha').oneOf([yup.ref('password')], 'Senhas diferentes!')
    })
    const formValidation = useFormik({
        validationSchema: validatorSchema,
        initialValues: {
            nickname: '',
            team: '',
            role: '',
            email: '',
            password: '',
            pass_confirm: '',
        },
        onSubmit: (formData) => {

        }
    })




    return (
        <>
            {isLoading && <div className='w-screen h-screen fixed bg-zinc-800/50'> <Loader /></div>}
            <div className='  pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
                {/* Form section */}
                <div className='w-full  flex flex-col items-center'>
                    <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Crie sua conta na comunidade!</span>
                    <form onSubmit={formValidation.handleSubmit} className='w-4/5 flex flex-col items-center gap-3 bg-DF-black rounded-lg text-white font-K2D p-5 '>
                        <InputForm
                            label='Nome de usuário'
                            htmlfor='nickname'
                            inputType='text'
                            placeholder='Digite um nome de usuário'
                            {...formValidation.getFieldProps('nickname')}
                            error={formValidation.touched.nickname && formValidation.errors.nickname ? formValidation.errors.nickname : ''}

                        />
                        <InputForm
                            label='Nome da equipe'
                            placeholder='Equipe da robótica'
                            htmlfor='team'
                            inputType='text'
                            {...formValidation.getFieldProps('team')}

                            error={formValidation.touched.team && formValidation.errors.team ? formValidation.errors.team : ''}
                        />
                        <InputForm
                            label='Função na equipe'
                            placeholder='Ex.:Programador,engenheiro,redação...'
                            htmlfor='role'
                            inputType='text'
                            {...formValidation.getFieldProps('role')}
                            error={formValidation.touched.role && formValidation.errors.role ? formValidation.errors.role : ''}
                        />
                        <InputForm
                            label='Digite seu email'
                            htmlfor='email'
                            inputType='email'
                            placeholder='Ex:selenegomes@gmail.com'
                            {...formValidation.getFieldProps('email')}
                            error={formValidation.touched.email && formValidation.errors.email ? formValidation.errors.email : ''}

                        />
                        <InputForm
                            label='Senha'
                            htmlfor='password'
                            inputType='password'
                            placeholder='Ex:123@abcdefg'
                            {...formValidation.getFieldProps('password')}
                            error={formValidation.touched.password && formValidation.errors.password ? formValidation.errors.password : ''}
                        />
                        <InputForm
                            label='Confirmar senha'
                            htmlfor='pass_confirm'
                            inputType='password'
                            placeholder='Confirmar senha'
                            {...formValidation.getFieldProps('pass_confirm')}
                            error={formValidation.touched.pass_confirm && formValidation.errors.pass_confirm ? formValidation.errors.pass_confirm : ''}
                        />
                        <SubmitButton label='Registrar' disabled={!formValidation.isValid} />


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
                    <img src={MainFoto} alt="Foto principal"
                        loading='lazy' />
                </div>
            </div>
        </>
    )
}