import { Header } from "../../components/Header";
import Like from '../../assets/icons/🦆 icon _heart_.svg';
import Comment from '../../assets/icons/🦆 icon _message_.svg';
import { useLocation } from "react-router-dom";
import { LikeComment } from "../../components/LikeComment";
import { array } from "yup";
import { CommentItem } from "../../components/CommentItem";



export function DetailPage() {

    const {state} = useLocation();
    


    return (
        <div className=" min-h-screen overflow-auto flex flex-col bg-DF-black">
            <Header />

            {/* Body post section */}
            <div className="w-full my-5 px-10">
                {/* Full post */}
                <div className="w-full flex flex-col  rounded-lg bg-DF-White font-K2D p-2">
                    {/* Inline data */}
                    <div className="flex items-baseline gap-5">
                        <div className="flex gap-1">
                            <span className="font-bold ">{state[0].username}</span>
                            <span className=" font-light ">{state[0].team}</span>
                        </div>
                        <span className="text-sm text-zinc-700 bg-zinc-300 rounded-sm px-1">{state[0].timepost}</span>
                    </div>

                    <span className="font-bold md:text-2xl">{state[0].title}</span>
                    <p className="font-light break-words text-start md:text-lg">{state[0].body}</p>

                    {/* divider */}
                    <div className="w-full h-0.5 bg-black rounded-lg mt-5"/>
                    <LikeComment
                        comments={state[0].comments?.length ?? '0'}
                        likes={state[0].likes}
                        postUID={state[0].UID}
                    />

                </div>

            </div>
            
            <div className="flex font-K2D text-white flex-col w-full ">
                <span className="font-semibold text-xl mx-5">Comentários</span>
            </div>

            {/* Comments section */}
            <div className="w-full flex flex-col p-5">


                <CommentItem/>


            </div>


        </div>
    )
}