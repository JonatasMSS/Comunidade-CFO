import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FB_Auth } from "../routes/firebase_app";
import * as Dialog from '@radix-ui/react-dialog';
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";


export function InlineUserData() {

    const user = useContext(AuthContext);
    const isSmallScreen = useMediaQuery({ query: '(max-width:640px)' })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signOut = async () => {

        await FB_Auth.signOut()

        navigate('/', { replace: true })

    }

    return (
        <>
            {
                isSmallScreen ?
                    <Dialog.Root>
                        <Dialog.Trigger className="cursor-pointer">
                            <div className="flex gap-2 items-center">
                                <span>{user?.name}</span>
                                {FB_Auth.currentUser?.photoURL ? <img src={FB_Auth.currentUser.photoURL} className="w-8 rounded-full" /> : <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>}
                            </div>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="bg-zinc-800/50 fixed inset-0" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-DF-black text-white font-K2D p-5 rounded-lg">
                                <Dialog.Title className="font-bold text-xl">
                                    O que deseja fazer?
                                </Dialog.Title>
                                <Dialog.Description className="h-full gap-5 my-5 flex flex-col justify-center items-center">
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
                                </Dialog.Description>

                            </Dialog.Content>

                        </Dialog.Portal>
                    </Dialog.Root> :
                    <div className="flex gap-2 items-center">
                        <span>{user?.name}</span>
                        {FB_Auth.currentUser?.photoURL ? <img src={FB_Auth.currentUser.photoURL} className="w-8 rounded-full" /> : <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>}
                    </div>
            }
        </>
    )
}
