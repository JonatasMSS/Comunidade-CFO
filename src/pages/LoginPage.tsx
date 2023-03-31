import { useFormik } from "formik"
import { InputForm } from "../components/InputForm"
import { SubmitButton } from "../components/SubmitButton"
import * as yup from 'yup';




import MainFoto from '../assets/Principal.jpg';
import { GoogleLogin } from "../components/GoogleLogin";
import { Link, useNavigate } from "react-router-dom";
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import FB_Auth from "../routes/firebase_auth";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { SignIn } from "../controllers/firebase_auth_controller";

export function LoginPage() {

    const navigator = useNavigate()
    const [isLoading, setLoading] = useState(false);





    const validationSchema = yup.object().shape({
        email: yup.string().email('Digite um email válido').required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório')
    })

    const formValidation = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            email: '',
            password: ''
        },
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await SignIn({persistence:browserSessionPersistence,email:values.email,password:values.password})
                setLoading(false);
                navigator('/posts');
            } catch (error) {
                setLoading(false);
                alert('Senha ou usuário incorretos')
            }
        }
    })

    




    return (
        <>  
            {
                isLoading && <Loader/>
            }
            <div className=' pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
                {/*  Login section */}
                <div className='w-full h-full flex flex-col gap-5 justify-start items-center'>
                    <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Faça login para acessar a comunidade!</span>
                    <form onSubmit={formValidation.handleSubmit} className='w-4/5 flex flex-col items-center gap-3 bg-DF-black rounded-lg text-white font-K2D p-5 '>
                        <InputForm
                            htmlfor='email'
                            inputType='email'
                            label='E-mail'
                            {...formValidation.getFieldProps('email')}
                            placeholder='Digite seu email'
                            error={formValidation.touched.email && formValidation.errors.email ? formValidation.errors.email : ''}
                        />


                        <InputForm
                            htmlfor='password'
                            inputType='password'
                            label='Senha'
                            placeholder='Digite sua senha'
                            {...formValidation.getFieldProps('password')}
                            error={formValidation.touched.password && formValidation.errors.password ? formValidation.errors.password : ''}

                        />
                        <span className='font-semibold w-full text-center text-red-400'>Esqueci minha senha</span>


                        <SubmitButton
                            label='Entrar'
                            disabled={!formValidation.isValid}
                        />

                        <GoogleLogin loaderState={setLoading} />


                        <span className="w-full text-center">Não tem uma conta? <Link className="font-bold text-green-600" to={'/registro'}>Registre-se</Link></span>

                    </form>
                </div>

                {/* Image Section */}
                <img src={MainFoto} alt="Foto principal"
                    className='lg:relative lg:w-1/2 lg:min-h-screen' loading='lazy' />
            </div>
        </>
    )
}
