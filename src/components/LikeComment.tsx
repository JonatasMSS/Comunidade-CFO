
import { useEffect, useState } from 'react';
import Like from '../assets/icons/🦆 icon _heart_.svg';
import LikeSelected from '../assets/icons/🦆 icon _heart_selected.svg';
import Comment from '../assets/icons/🦆 icon _message_.svg';
import { RTUpdatePost } from '../controllers/firebase_realtime_database';



interface ILikeComment {
    likes: string;
    comments: string;
    postUID:string;
}

export function LikeComment({ likes = '0', comments = '0' ,postUID}: ILikeComment) {

    const [selected, setSelected] = useState(false);
    const [actualLikes, setActualLikes] = useState(Number(likes));


    const handleLikes = async () => {
        if(selected){
            await RTUpdatePost(postUID,{likes: (actualLikes - 1).toString() })
            setActualLikes(prevLikes =>prevLikes - 1);
            setSelected(false);
        }
        else{
            await RTUpdatePost(postUID,{likes: (actualLikes + 1).toString() })
            setActualLikes(prevLikes => prevLikes + 1);
            setSelected(true);
        }
        
    }


    return (
        <div className="w-full my-2 flex gap-2">
            {/* Likes */}
            <div className="flex gap-1">
                <button onClick={handleLikes}><img  src={selected ? LikeSelected : Like} alt="Like" className="w-6" /></button>
                <span className="font-light">{actualLikes}</span>
            </div>
            {/* Commentarios */}
            <div className="flex gap-1">
                <img src={Comment} alt="Coment" className="w-6" />
                <span className="font-light">{comments}</span>
            </div>
        </div>

    )
}