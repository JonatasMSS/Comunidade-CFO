import { useMediaQuery } from "react-responsive";
import { Header } from "../../components/Header";
import * as Tabs from '@radix-ui/react-tabs';
import Like from '../../assets/icons/🦆 icon _heart_.svg';
import Comment from '../../assets/icons/🦆 icon _message_.svg';
export function PostPage() {

    const isSmallScreen = useMediaQuery({ query: '(max-width:640px)' })


    return (
        <div className="w-screen h-screen flex flex-col bg-black-light ">
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
                        <Tabs.Content value="em_alta" className="w-full flex flex-col py-5">
                            <div className="w-full flex flex-col bg-DF-White rounded-lg font-K2D text-black p-2 ">

                                {/*Post Header */}
                                <div className="flex items-baseline md:gap-2">
                                    {/* User and team */}
                                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                                        <span className="font-bold text-sm md:text-base ">User's name</span>
                                        <span className="font-medium text-sm">Equipe criadores</span>
                                    </div>

                                    {/* Time */}
                                    <span className="text-sm text-zinc-700">Hora da postagem</span>

                                </div>

                                {/* Separator */}
                                <div className="w-full my-2"></div>

                                {/* Post Body */}
                                <div className="w-full flex flex-col">
                                    <span className="font-bold">Titulo do post</span>
                                    <p className="text-sm font-light text-start break-words max-h-16 text-red-500 overflow-hidden">{Array.from({ length: 400 }).map(e => 'Lorem ipsum')}</p>
                                </div>

                                {/* Like Commment section */}
                                <div className="w-full my-2 flex gap-2">
                                    {/* Likes */}
                                    <div className="flex gap-1">
                                        <img src={Like} alt="Like" className="w-6" />
                                        <span className="font-light">23</span>
                                    </div>
                                    {/* Commentarios */}
                                    <div className="flex gap-1">
                                        <img src={Comment} alt="Coment" className="w-6" />
                                        <span className="font-light"> 44 comentários</span>
                                    </div>
                                </div>
                            </div>



                        </Tabs.Content>
                    </Tabs.Root>


                </div>

                {/* User data section */}
                {
                    !isSmallScreen && <div className="w-5/12 h-fit p-5 gap-3   bg-white rounded-lg flex flex-col justify-center items-center font-K2D text-black">
                        {/*Image section  */}
                        <div className="w-44 h-44 sm:w-32 sm:h-32 bg-gray-500 rounded-full" />
                        <span className="font-semibold lg:text-xl  w-full text-center">Nome completo do usuário</span>

                        {/* Data section */}

                        <span className="text-lg w-full">Equipe: EQUIPE</span>
                        <span className="text-lg w-full">Função: FUNÇÃO</span>


                        <button className="bg-red-500 px-5 py-2 rounded-lg font-bold">
                            Logout
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}