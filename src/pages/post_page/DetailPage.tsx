import { Header } from "../../components/Header";
import Like from '../../assets/icons/🦆 icon _heart_.svg';
import Comment from '../../assets/icons/🦆 icon _message_.svg';
import { useLocation } from "react-router-dom";



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
                            <span className="font-bold ">{state.username}</span>
                            <span className=" font-light ">{state.team}</span>
                        </div>
                        <span className="text-sm text-zinc-700 bg-zinc-300 rounded-sm px-1">{state.timepost}</span>
                    </div>

                    <span className="font-bold md:text-2xl">{state.title}</span>
                    <p className="font-light break-words text-start md:text-lg">{state.body}</p>

                    {/* divider */}
                    <div className="w-full h-0.5 bg-black rounded-lg mt-5"/>
                    {/* Like and comments */}
                    <div className="w-full my-2 flex gap-2">
                        {/* Likes */}
                        <div className="flex gap-1">
                            <img src={Like} alt="Like" className="w-6" />
                            <span className="font-light">{state.likes}</span>
                        </div>
                        {/* Commentarios */}
                        <div className="flex gap-1">
                            <img src={Comment} alt="Coment" className="w-6" />
                            <span className="font-light">{state.comments} comentários</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}