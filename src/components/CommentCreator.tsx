import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";



interface ICommentCreator{
    commentState: React.Dispatch<React.SetStateAction<boolean>>; // Muda o estado -> Se esta comentando ou não
}


export function CommentCreator({commentState}:ICommentCreator) {
    const [commentValue, setCommentValue] = useState<string | undefined>();


    const handleCancelComment = () => {
        commentState(false);
    }

    const handleSubmitComment = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    return (

        <div className="w-full  gap-4 flex flex-col justify-center items-center font-K2D " >
            <MDEditor value={commentValue} onChange={setCommentValue} className="w-4/5" />
            <div className="w-4/5 flex px-1 justify-end gap-5">
                <button className="hover:bg-red-400 hover:border-red-500 bg-red-500 p-1 rounded-sm sm:text-xl border-2 border-red-600 transition-all" onClick={handleCancelComment}>Cancelar</button>
                <button disabled={commentValue ? false : true} onClick={handleSubmitComment} className="disabled:bg-green-300 disabled:border-green-400 hover:bg-green-400 hover:border-green-500 bg-green-500 p-1 rounded-sm sm:text-xl border-2 border-green-600 transition-all">Confirmar</button>

            </div>
        </div>

    )
}