
import dayjs from 'dayjs';
import Like from '../assets/icons/🦆 icon _heart_.svg';
import LikeSelected from '../assets/icons/🦆 icon _heart_selected.svg';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';


interface ICommentItem {
    username: string;
    body: string;
    timepost: Date;
    likes: string;
}

export function CommentItem({ ...props }: ICommentItem) {

    const relativeDate = dayjs(props.timepost).fromNow();


    const [isSelected, setSelected] = useState(false);
    const [actualLikes, setActualLikes] = useState(Number(props.likes))

    const handleLikes = () => {
        if (isSelected) {
            setActualLikes(prevState => prevState - 1);
            setSelected(false);
        }
        else {
            setActualLikes(prevState => prevState + 1);
            setSelected(true);
        }

    }

    return (

        < div className=" w-full flex flex-col bg-white min-h-[5rem] rounded-lg font-K2D p-2 " >
            {/* User data */}
            < div className=" flex gap-2" >
                <span className="font-bold">{props.username}</span>
                <span className="font-extralight text-zinc-700 bg-zinc-300 truncate rounded-sm px-1">{relativeDate}</span>
            </div >
            <div data-color-mode="light" className="text-xl sm:text-base font-extralight my-2 break-words ">
                <MDEditor.Markdown className='font-medium' source={props.body} />
            </div>

            <button onClick={handleLikes} className='flex gap-1'>
                {isSelected ? <img src={LikeSelected} className='w-6' /> : <img src={Like} className='w-6' />}
                <span>{`${actualLikes} likes`}</span>
            </button>
        </div >
    )
}