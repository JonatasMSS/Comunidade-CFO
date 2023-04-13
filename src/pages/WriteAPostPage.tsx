import { useState } from "react";
import { Header } from "../components/Header";
import { InputForm } from "../components/InputForm";
import MDEditor from "@uiw/react-md-editor";
import { SubmitButton } from "../components/SubmitButton";
import { Link } from "react-router-dom";




export function WritePostPage(){

    const [postData,setPostData] = useState<string | undefined>();

    return(
        <div className="w-screen h-screen overflow-auto bg-DF-black flex flex-col gap-1">
           <Header/>
           {/* body */}
           <div className="w-full h-full flex flex-col text-white font-K2D items-center justify-center py-5">

                <form className=" w-3/4 h-full gap-5 flex flex-col">
                    <span className="font-bold text-4xl">Criar uma nova publicação</span>

                    <InputForm
                        htmlfor="title"
                        inputType="text"
                        label="Titulo da publicação"
                        placeholder=""
                    />

                    <div className="border-2 border-gray-600 rounded-lg p-1 focus:border-red-500">
                        <MDEditor value={postData} onChange={setPostData}/>
                    </div>
 
                    <div className="w-full flex justify-end gap-5">
                        <Link  to={'/posts'} className="bg-red-500 disabled:bg-red-300 transition-colors py-2 px-6 rounded-lg">Cancelar </Link >
                        <SubmitButton
                            label="Publicar"

                        />
                    </div>
                </form>

           </div>
        </div>
    )
}