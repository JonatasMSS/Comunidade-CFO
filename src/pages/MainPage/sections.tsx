



import { Carrousel } from '../../components/Carrousel';
import { InputForm } from '../../components/InputForm';
import Google from '../../assets/GoogleSimbolo.svg';
import { SubmitButton } from '../../components/SubmitButton';
import * as yup from 'yup';
import { useFormik } from 'formik';

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
        onSubmit: (values) => {
            alert(`Enviado com sucesso! --> Email:${values.email} e Senha:${values.password}`)
        }
    })



    return (
        <div className='w-full h-full flex flex-col gap-5 justify-start items-center'>
            <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Faça login para acessar a comunidade!</span>
            <form onSubmit={formValidation.handleSubmit} className='w-4/5 flex flex-col items-center gap-3 bg-DF-black rounded-lg text-white font-K2D p-5 '>
                <InputForm
                    htmlfor='email'
                    inputType='email'
                    label='E-mail'
                    onBlur={formValidation.handleBlur}
                    onChange={formValidation.handleChange}
                    value={formValidation.values.email}
                    placeholder='Digite seu email'
                    error={formValidation.touched && formValidation.errors ? formValidation.errors.email : ''}
                />


                <InputForm
                    htmlfor='password'
                    inputType='password'
                    label='Senha'
                    placeholder='Digite sua senha'
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    value={formValidation.values.password}
                    error={formValidation.touched && formValidation.errors ? formValidation.errors.password : ''}

                />
                <span className='font-semibold w-full text-center text-red-400'>Esqueci minha senha</span>


                <SubmitButton
                    label='Entrar'
                    disabled = {!formValidation.isValid}
                />

                <button className='w-full p-2 rounded-lg bg-white flex text-black  font-semibold items-center justify-evenly sm:justify-center sm:gap-5'><img src={Google} alt="..." /> Entrar com o google</button>


            </form>
        </div>
    )
}