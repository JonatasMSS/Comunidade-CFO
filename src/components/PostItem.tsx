
import { Link, Outlet } from 'react-router-dom';
import { LikeComment } from './LikeComment';
import CommentModel from '../models/comment_model';


 interface IPostItem{
    UID:string;
    title:string;
    body:string;
    username:string;
    team:string;
    timepost:string;
    likes:string;
    comments?:Array<CommentModel>;
}


export function PostItem({...props}:IPostItem) {
    const comments = props.comments;
    return (
        <div className="w-full flex flex-col bg-DF-White rounded-lg font-K2D text-black p-2 ">

            {/*Post Header */}
            <div className="flex items-baseline justify-between md:gap-2 md:justify-start">
                {/* User and team */}
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                    <span className="font-bold text-sm md:text-base truncate ">{props.username}</span>
                    <span className="font-medium text-sm">{props.team}</span>
                </div>

                {/* Time */}
                <span className="text-sm text-zinc-700 bg-zinc-300 truncate rounded-sm px-1">{props.timepost}</span>
                <div className='flex truncate '>
                    <Link to={`${props.UID}/details`} state={[props]}  className='font-bold text-blue-700'>Ver post completo</Link>
                </div>
            </div>

            {/* Separator */}
            <div className="w-full my-2"></div>

            {/* Post Body */}
            <div className="w-full flex flex-col">
                <span className="font-bold">{props.title}</span>
                <p className="text-sm font-light text-start break-words max-h-16  overflow-hidden">{props.body}</p>
            </div>

            {/* Like Commment section */}
            <LikeComment
                postUID={props.UID}
                comments={props.comments?.length.toString() ?? '0'}
                likes={props.likes}
            />

           
        </div>
    )
}