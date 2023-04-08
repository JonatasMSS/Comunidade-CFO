
import Like from '../assets/icons/🦆 icon _heart_.svg';
import Comment from '../assets/icons/🦆 icon _message_.svg';


interface IPostItem{
    title:string;
    body:string;
    username:string;
    team:string;
    timepost:string;
    likes:string;
    comments:string;
}


export function PostItem({...props}:IPostItem) {
    return (
        <div className="w-full flex flex-col bg-DF-White rounded-lg font-K2D text-black p-2 ">

            {/*Post Header */}
            <div className="flex items-baseline md:gap-2">
                {/* User and team */}
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                    <span className="font-bold text-sm md:text-base ">{props.username}</span>
                    <span className="font-medium text-sm">{props.team}</span>
                </div>

                {/* Time */}
                <span className="text-sm text-zinc-700 bg-zinc-300 rounded-sm px-1">{props.timepost}</span>

            </div>

            {/* Separator */}
            <div className="w-full my-2"></div>

            {/* Post Body */}
            <div className="w-full flex flex-col">
                <span className="font-bold">{props.title}</span>
                <p className="text-sm font-light text-start break-words max-h-16 text-red-500 overflow-hidden">{props.body}</p>
            </div>

            {/* Like Commment section */}
            <div className="w-full my-2 flex gap-2">
                {/* Likes */}
                <div className="flex gap-1">
                    <img src={Like} alt="Like" className="w-6" />
                    <span className="font-light">{props.likes}</span>
                </div>
                {/* Commentarios */}
                <div className="flex gap-1">
                    <img src={Comment} alt="Coment" className="w-6" />
                    <span className="font-light">{props.comments}</span>
                </div>
            </div>
        </div>
    )
}