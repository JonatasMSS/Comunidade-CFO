
import { Link, Outlet } from 'react-router-dom';
import { LikeComment } from './LikeComment';
import CommentModel from '../models/comment_model';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PostModel from '../models/post_model';
import { RTQueryGetComments } from '../controllers/firebase_realtime_database';
import { equalTo, orderByChild } from 'firebase/database';


 interface IPostItem{
    UID:string;
    userId:string;
    title:string;
    body:string;
    username:string;
    team:string;
    timepost:Date;
    likes:string;
    comments?:Array<CommentModel>;
}


export function PostItem({...props}:IPostItem) {
    const relativeTime = dayjs(props.timepost).fromNow();
    const [postComments,setPostComments] = useState<CommentModel[] | undefined>();

    useEffect(() => {

        RTQueryGetComments([orderByChild('postReferenceId'),equalTo(props.UID)])
        .then((comments)=>{ 
            if(comments){
                setPostComments(comments);
            }
        })


    },[])

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
                <span className="text-sm text-zinc-700 bg-zinc-300 truncate rounded-sm px-1">{relativeTime}</span>
                <div className='flex truncate '>
                    <Link to={`${props.UID}/details`} state={[]}  className='font-bold text-blue-700'>Ver post completo</Link>
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
                comments={postComments?.length.toString() ?? '0'}
                likes={props.likes}
            />

           
        </div>
    )
}