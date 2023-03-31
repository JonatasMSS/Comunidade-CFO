import { useMediaQuery } from "react-responsive";
import { Header } from "../../components/Header";
import * as Tabs from '@radix-ui/react-tabs';
import { PostItem } from "../../components/PostItem";
import FB_Auth from "../../routes/firebase_auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export function PostPage() {

    const isSmallScreen = useMediaQuery({ query: '(max-width:640px)' })
    const user = useContext(AuthContext);

    console.log(user);

    if (user && user.uid) {
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
    else {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center text-white font-bold">
                Não logado
            </div>
        )
    }



}