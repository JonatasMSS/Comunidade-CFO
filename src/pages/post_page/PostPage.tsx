import { useMediaQuery } from "react-responsive";
import { Header } from "../../components/Header";
import * as Tabs from '@radix-ui/react-tabs';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components/Loader";
import FB_Auth from "../../routes/firebase_auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PostModel from "../../models/post_model";
import { GetAllPosts, GetCommentsInPost, QueryGetPost } from "../../controllers/firebase_controller";
import { PostItem } from "../../components/PostItem";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function PostPage() {

    const isSmallScreen = useMediaQuery({ query: '(max-width:640px)' })
    const user = useContext(AuthContext);
    const navigate = useNavigate();


    const [posts, setPosts] = useState<{ relevant: JSX.Element[], recent: JSX.Element[] } | undefined>();
    const [isloading, setLoading] = useState(false);


    const signOut = async () => {
        setLoading(true);
        await FB_Auth.signOut()
        setLoading(false);
        navigate('/')

    }

    const GetAllPostersAndFilter = async () => {
        let relevantPost: JSX.Element[] = [];
        let recentPost: JSX.Element[] = [];

        await QueryGetPost('likes', 'desc').then((postIn) => {
            postIn?.map(async (post) => {
                const postTime = dayjs(post.postTime);
                const differenceBetweenPostTimeAndToday = postTime.toNow();
                const commentsInPost = await GetCommentsInPost(post.UID);

                relevantPost.push(
                    <PostItem
                        UID={post.UID}
                        key={post.UID}
                        body={post.body}
                        comments={commentsInPost ?? []}
                        likes={post.likes}
                        team={post.team}
                        timepost={differenceBetweenPostTimeAndToday}
                        title={post.title}
                        username={post.user}
                    />
                )
            })
        })
        await QueryGetPost('postTime', 'desc').then((postIn) => {
            postIn?.map(async (post) => {
                const postTime = dayjs(post.postTime);
                const differenceBetweenPostTimeAndToday = postTime.toNow();
                const commentsInPost = await GetCommentsInPost(post.UID);

                recentPost.push(
                    <PostItem
                        key={post.UID}
                        UID={post.UID}
                        body={post.body}
                        comments={commentsInPost ?? []}
                        likes={post.likes}
                        team={post.team}
                        timepost={differenceBetweenPostTimeAndToday}
                        title={post.title}
                        username={post.user}
                    />
                )
            })
        })







        setPosts({ relevant: relevantPost, recent: recentPost });
    }


    useEffect(() => {
        // GetAllPostersAndFilter().then(() => {})

    }, [])





    if (user) {


        return (
            <>
                {isloading && <div className="w-screen h-screen fixed z-10 bg-zinc-700/50"><Loader /></div>}

                <div className=" min-h-screen overflow-auto flex flex-col bg-black-light ">
                    <Header />

                    {/* Body section */}
                    <div className="w-full h-full flex gap-2 justify-center p-5">

                        {/* Posts Section */}
                        <div className="w-full">

                            <Tabs.Root defaultValue="em_alta" className="font-K2D text-white">

                                {/* Triggers de dados */}
                                <Tabs.List className="flex w-full gap-2 p-2 border-b-2 border-zinc-400">
                                    <Tabs.Trigger value="em_alta"
                                        className="data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:px-2 data-[state=active]:rounded-sm transition-all">
                                        Em alta
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="recentes"
                                        className="data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:px-2 data-[state=active]:rounded-sm transition-all">
                                        Recentes
                                    </Tabs.Trigger>
                                </Tabs.List>

                                {/* Conteudo de dados em alta */}
                                <Tabs.Content value="em_alta" className="w-full flex flex-col py-5 gap-5">
                                    {
                                        posts?.relevant ? posts.relevant.map(relevantPost => relevantPost) : <Loader />
                                    }
                                </Tabs.Content>
                                {/* Conteudos de dados recentes */}
                                <Tabs.Content value="recentes" className="w-full flex flex-col  gap-5">
                                    {
                                        posts?.recent ? posts.recent.map(recentPost => recentPost) : <Loader />
                                    }
                                </Tabs.Content>

                            </Tabs.Root>


                        </div>

                        {/* User data section */}
                        {
                            !isSmallScreen && <div className="w-5/12 h-fit p-5 gap-3   bg-white rounded-lg flex flex-col justify-center items-center font-K2D text-black">
                                {/*Image section  */}
                                {FB_Auth.currentUser?.photoURL ? <img src={FB_Auth.currentUser.photoURL} className="rounded-full w-40" /> : <div className="w-44 h-44 sm:w-32 sm:h-32 bg-gray-500 rounded-full" />}
                                <span className="font-semibold lg:text-xl  w-full text-center">{user.name}</span>

                                {/* Data section */}

                                <span className="text-lg w-full">Equipe: {user.team}</span>
                                <span className="text-lg w-full">Função: {user.role}</span>



                                <Link
                                    to={'write'}
                                    className="bg-green-400 px-5 py-2 rounded-lg font-bold">
                                    Criar uma publicação
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="bg-red-500 px-5 py-2 rounded-lg font-bold">
                                    Logout
                                </button>
                            </div>
                        }
                    </div>

                </div>

            </>
        )
    }
    else {
        return (

            <div className="w-screen h-screen fixed z-10 bg-zinc-800">
                <Loader />
            </div>
        )
    }



}