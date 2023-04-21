import { ArrowCircleLeft } from "@phosphor-icons/react";
import { InputForm } from "../components/InputForm";
import { Loader } from "../components/Loader";
import { SubmitButton } from "../components/SubmitButton";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { UpdateUserInFirestore } from "../controllers/firebase_controller";
import { FB_Auth } from "../routes/firebase_app"; from "../routes/firebase_auth";
import MainFoto from '../assets/Principal.jpg';


export function RegisterFromGooglePage(){


    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    


    //Form validator
    const validatorSchema = yup.object().shape({
        name: yup.string().required('É preciso de um nome'),
        team: yup.string().required('Informe o nome de sua equipe'),
        role: yup.string().required('Informe sua função na equipe')
    })
    const formValidation = useFormik({
        validationSchema: validatorSchema,
        initialValues: {
            name: '',
            team: '',
            role: '',
        },
        onSubmit: async (formData) => {
            try {
                setLoading(true);
                await UpdateUserInFirestore(formData,FB_Auth.currentUser?.email ?? '')
                navigate('/posts');
                
            } catch (error) {
                alert(error);

            } finally {
                setLoading(false);
            }
        }
    })



    return(
        <>
            {isLoading && <div className='w-screen h-screen fixed bg-zinc-800/50'> <Loader /></div>}
            <div className=' h-screen  pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
                {/* Form section */}
                <div className='w-full  flex flex-col items-center'>
                    <div className='flex items-center px-5 sm:px-0'>
                        <button
                            onClick={() => navigate('/login')}
                        ><ArrowCircleLeft color='#FFFFFF' size={38}/></button>
                        <span className='text-white my-10 mx-2  font-K2D font-bold text-3xl'>Informe os seguintes dados para continuar</span>
                    </div>
                    <form onSubmit={formValidation.handleSubmit} className='w-4/5 flex flex-col items-center gap-3 bg-DF-black rounded-lg text-white font-K2D p-5 '>
                        <InputForm
                            label='Nome de usuário'
                            htmlfor='name'
                            inputType='text'
                            placeholder='Digite um nome de usuário'
                            {...formValidation.getFieldProps('name')}
                            error={formValidation.touched.name && formValidation.errors.name ? formValidation.errors.name : ''}

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
                        <SubmitButton label='Prosseguir' disabled={!formValidation.isValid} />


                       

                    </form>
                </div>


                {/* Image Section */}
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <img src={MainFoto} alt="Foto principal"
                        loading='lazy' />
                </div>
            </div>
        </>
    )
}