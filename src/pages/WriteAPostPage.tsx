import { Header } from "../components/Header";
import { InputForm } from "../components/InputForm";




export function WritePostPage(){
    return(
        <div className="w-screen h-screen bg-DF-black flex flex-col gap-1">
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

                </form>

           </div>
        </div>
    )
}