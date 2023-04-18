
import Like from '../assets/icons/🦆 icon _heart_.svg';
import LikeSelected from '../assets/icons/🦆 icon _heart_selected.svg';


interface ICommentItem{
    username: string;
    body:string;
    timepost:string;
    likes:string;
}   

export function CommentItem({...props}:ICommentItem) {
    return (

        < div className=" w-full flex flex-col bg-white min-h-[5rem] rounded-lg font-K2D p-2 " >
            {/* User data */}
            < div className=" flex gap-2" >
                <span className="font-bold">{props.username}</span>
                <span className="font-extralight text-zinc-700 bg-zinc-300 truncate rounded-sm px-1">{props.timepost}</span>
            </div >
            <p className="text-xl sm:text-base font-extralight my-2 break-words ">
                {
                    props.body
                }
            </p>

            <div className='flex gap-1'>
                <img src={Like} className='w-6' />
                <span>{`${props.likes} likes`}</span>
            </div>
        </div >
    )
}