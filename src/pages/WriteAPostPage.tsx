import { FormEvent, useContext, useState } from "react";
import { Header } from "../components/Header";
import { InputForm } from "../components/InputForm";
import MDEditor from "@uiw/react-md-editor";
import { SubmitButton } from "../components/SubmitButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContext } from "../context/AuthContext";
import PostModel from "../models/post_model";
import { Timestamp } from "firebase/firestore";
import { Loader } from "../components/Loader";
import { CreatePost } from "../controllers/firebase_controller";




export function WritePostPage() {

    const user = useContext(AuthContext);


    const [postData, setPostData] = useState<string | undefined>('');
    const [title, setPostTitle] = useState<string | undefined>('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmitPost = async (event: FormEvent) => {
        event.preventDefault();
        if (!postData || !title) {
            return alert('Título ou conteudo vazio!');
        }

        try {
            setLoading(true);
            const dataToSend = new PostModel({
                UID: '',
                body: postData,
                likes: '0',
                title: title,
                team: user?.team ?? 'no Team',
                user: user?.name ?? 'no Name',
                userId: user!.UID,
                postTime: new Date(Date.now())
            });
            
            await CreatePost(dataToSend);

        } catch (error) {
            alert(`Ocorreu um erro ao tentar publicar: ${error}`);
        }finally{
            setLoading(false);
        }



    }

    return (
        <>  
            {isLoading && <div className="w-screen h-screen fixed z-10 bg-zinc-600/40"><Loader/></div>}
            <div className="w-screen h-screen overflow-auto bg-DF-black flex flex-col gap-1">
                <Header />
                {/* body */}
                <div className="w-full h-full flex flex-col text-white font-K2D items-center justify-center py-5">

                    <form className=" w-3/4 h-full gap-5 flex flex-col">
                        <span className="font-bold text-4xl">Criar uma nova publicação</span>

                        <InputForm
                            htmlfor="title"
                            inputType="text"
                            label="Titulo da publicação"
                            placeholder="Digite o titulo de sua postagem"
                            onChange={(value) => setPostTitle(value.currentTarget.value)}

                        />

                        <div className="border-2 border-gray-600 rounded-lg p-1 focus:border-red-500">
                            <MDEditor value={postData} onChange={setPostData} />
                        </div>

                        <div className="w-full flex justify-end gap-5">
                            <Link to={'/posts'} className="bg-red-500 disabled:bg-red-300 transition-colors py-2 px-6 rounded-lg">Cancelar </Link >
                            <SubmitButton
                                label="Publicar"
                                handleSubmit={handleSubmitPost}
                            />
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}