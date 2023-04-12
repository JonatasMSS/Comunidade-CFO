
import Like from '../assets/icons/🦆 icon _heart_.svg';
import Comment from '../assets/icons/🦆 icon _message_.svg';



interface ILikeComment{
    likes:string;
    comments:string
}

export function LikeComment({likes = '0' ,comments = '0'}:ILikeComment) {




    return (
        <div className="w-full my-2 flex gap-2">
            {/* Likes */}
            <div className="flex gap-1">
                <img src={Like} alt="Like" className="w-6" />
                <span className="font-light">{likes}</span>
            </div>
            {/* Commentarios */}
            <div className="flex gap-1">
                <img src={Comment} alt="Coment" className="w-6" />
                <span className="font-light">{comments}</span>
            </div>
        </div>

    )
}