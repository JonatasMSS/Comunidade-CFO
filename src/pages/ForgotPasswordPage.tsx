
import { useState } from 'react';
import MainFoto from '../assets/Principal.jpg';
import { Loader } from '../components/Loader';
import { InputForm } from '../components/InputForm';
import { SubmitButton } from '../components/SubmitButton';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GetUserData } from '../controllers/firebase_controller';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { EmailNotInFirestore } from '../errors/EmaitNotInFirestore';
import { FB_Auth } from "../routes/firebase_app"; 
import { sendPasswordResetEmail } from 'firebase/auth';




export function ForgotPasswordPage() {

    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const schemaValidation = yup.object().shape(
        {
            email:yup.string().required('Campo obrigatório!')
        }
    )
    
    const formValidation = useFormik({
        validationSchema:schemaValidation,
        initialValues:{
            email:''
        },
        onSubmit:async (formData) => {
            try {
                setLoading(true);
                const verifyEmailInFirestore = await GetUserData(formData.email);
                if(!verifyEmailInFirestore){
                    throw new EmailNotInFirestore('Email não cadastrado para redefinição!');
                }
                await sendPasswordResetEmail(FB_Auth,formData.email)
                alert('Link de redefinição enviado com sucesso a sua caixa de entrada!');
            } catch (error) {
               if(error instanceof EmailNotInFirestore){
                 alert(error);
               }else{
                alert(`Ocorreu um erro na redefinição:${error}`);
               }
            }finally{
                setLoading(false);
            }

        }
    })

    return (
        <>
            {
                isLoading && <div className="w-screen h-screen fixed z-10">
                    <Loader />
                </div>
            }
            <div className=' pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
                {/*  Login section */}
                <div className='w-full h-full flex flex-col gap-5 justify-start items-center'>
                    <div className='flex items-center px-5 sm:px-0'>
                        <button
                            onClick={() => navigate('/login')}
                        ><ArrowCircleLeft color='#FFFFFF' size={38} /></button>
                        <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Redefinição de senha</span>
                    </div>
                    <form onSubmit={formValidation.handleSubmit} className='w-4/5 flex flex-col items-center gap-3 bg-DF-black rounded-lg text-white font-K2D p-5 '>
                        <InputForm
                            htmlfor='email'
                            inputType='email'
                            label='Digite o seu email'
                            placeholder='xxxx@gmail.com'
                            {...formValidation.getFieldProps('email')}
                            error={formValidation.touched.email && formValidation.errors.email ? formValidation.errors.email : ''}
                        />
                        <SubmitButton
                            label='Redefinir senha'
                            disabled={!formValidation.isValid}

                        />


                    </form>
                </div>

                {/* Image Section */}
                <img src={MainFoto} alt="Foto principal"
                    className='lg:relative lg:w-1/2 lg:min-h-screen' loading='lazy' />
            </div>
        </>
    )
}