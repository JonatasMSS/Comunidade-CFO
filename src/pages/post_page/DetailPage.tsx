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



export function DetailPage() {

    const {postId} = useParams();
    //TODO: MUDAR ISSO PARA FAZER REQUISIÇÕES

    const [postData, setPostData] = useState<PostModel | null>();
    const [comments, setComments] = useState<CommentModel[] | null>();
    const relativeTime = dayjs(postData?.postTime).fromNow();
    const [isLoading,setIsLoading] = useState(false);


    const fetchPostDataAndComments = async () => {
        const [post,comments] = await Promise.all([
            RTGetPost(postId!),
            RTQueryGetComments([orderByChild('postReferenceId'),equalTo(postId!)])
        ]);

        setPostData(post);
        setComments(comments);

    }

    useEffect(() => {
        fetchPostDataAndComments().then(() => {
            console.log('Post data e comentarios coletados com sucesso!');
        })
    },[])



    if(isLoading){
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

                    <span className="font-bold md:text-2xl">{postData?.title}</span>
                    <div className="" data-color-mode="light">
                        <MDEditor.Markdown style={{backgroundColor:'#EBEBEB'}}  source={postData?.body}/>
                    </div>

                    {/* divider */}
                    <div className="w-full h-0.5 bg-black rounded-lg mt-5" />
                    {/* <LikeComment
                        comments={state.comments?.length ?? '0'}
                        likes={state[0].likes}
                        postUID={state[0].UID}
                    /> */}

                </div>

            </div>

            <div className="flex font-K2D text-white flex-col w-full ">
                <span className="font-semibold text-xl mx-5">Comentários</span>
            </div>

            {/* Comments section */}
            <div className="w-full flex flex-col p-5 gap-5">
                {
                    
                }
            </div>


        </div>
    )
}