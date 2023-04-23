import { Header } from "../../components/Header";
import Like from '../../assets/icons/🦆 icon _heart_.svg';
import Comment from '../../assets/icons/🦆 icon _message_.svg';
import { useLocation, useParams } from "react-router-dom";
import { LikeComment } from "../../components/LikeComment";
import { array } from "yup";
import { CommentItem } from "../../components/CommentItem";
import CommentModel from "../../models/comment_model";
import { useEffect, useState } from "react";
import PostModel from "../../models/post_model";
import { Loader } from "../../components/Loader";
import { RTGetPost, RTQueryGetComments, RTQueryGetPost } from "../../controllers/firebase_realtime_database";
import { equalTo, orderByChild, set } from "firebase/database";
import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import { CommentCreator } from "../../components/CommentCreator";



export function DetailPage() {

    const {postId} = useParams();

    const [postData, setPostData] = useState<PostModel | null>();
    const [comments, setComments] = useState<CommentModel[] | null>();
    const [isLoading,setIsLoading] = useState(false);
    const [isCommenting, setIsCommenting] = useState(true);
    const relativeTime = dayjs(postData?.postTime).fromNow();



    const fetchPostDataAndComments = async () => {
        const [post,comments] = await Promise.all([
            RTGetPost(postId!),
            RTQueryGetComments([orderByChild('postReferenceId'),equalTo(postId!)])
        ]);

        setPostData(post);
        setComments(comments);

    }

    useEffect(() => {
        setIsLoading(true);
        fetchPostDataAndComments().then(() => {
            console.log('Post data e comentarios coletados com sucesso!');
        }).finally(() => {
            setIsLoading(false);
        })
    },[])



    if(isLoading && !postData){
        return (
            <div className="w-screen flex flex-col justify-center items-center h-screen bg-black/90">
                <Loader/>
            </div>
        )
    }

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
                            <span className="font-bold ">{postData?.user}</span>
                            <span className=" font-light ">{postData?.team}</span>
                        </div>
                        <span className="text-sm text-zinc-700 bg-zinc-300 rounded-sm px-1">{relativeTime}</span>
                    </div>

                    
                    <div className=" p-1" data-color-mode="light">
                        <span className="font-bold md:text-2xl">{postData?.title}</span>
                        <MDEditor.Markdown disableCopy style={{backgroundColor:'#EBEBEB'}}  source={postData?.body}/>
                    </div>

                    {/* divider */}
                    <div className="w-full h-0.5 bg-black rounded-lg mt-5" />
                    <LikeComment
                        comments={comments?.length.toString() ?? '0'}
                        likes={postData?.likes ?? '0'}
                        postUID={postData?.UID ?? ''}
                    />

                </div>

            </div>

            {/* Reply button */}
            <div className="w-full flex my-3 ">
                {
                    isCommenting ? 
                    <CommentCreator
                        commentState={setIsCommenting}
                    />: 
                    <button onClick={() => setIsCommenting(true)} className="hover:bg-zinc-600 hover:scale-105 transition-all sm:text-xl p-1 mx-10 border-2 bg-DF-black rounded-lg text-white font-K2D">Reply</button>
                }
            </div>

            <div className="flex font-K2D text-white flex-col w-full my-2">
                <span className="font-semibold text-xl mx-5 ">Comentários</span>
            </div>

            {/* Comments section */}
            <div className="w-full flex flex-col p-5 gap-5">
               {
                comments && comments.map((comment) => {
                    return (
                        <CommentItem
                            key={comment.UID}
                            body={comment.body}
                            likes={comment.likes}
                            timepost={comment.commentTime}
                            username={comment.user}
                        />
                    )
                })
               }
            </div>


        </div>
    )
}