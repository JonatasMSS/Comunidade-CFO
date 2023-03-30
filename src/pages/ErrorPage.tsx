import { useRouteError } from "react-router"




export function ErrorPage(){
    const error = useRouteError() as any
    return(
        <div className="w-screen h-screen gap-5  bg-black text-white font-K2D flex flex-col justify-center items-center">
            <span className="text-5xl sm:text-8xl font-bold">Ops!</span>
            <span className="text-2xl sm:text-4xl text-center font-light">Aconteceu algo de errado enquanto navegava</span>
            <span className="text-red-500 sm:text-3xl font-bold italic">{error.statusText || error.message }</span>
            <button className="bg-zinc-600 text-white sm:text-2xl px-5 py-2 rounded-lg">
                Retornar
            </button>
        </div>
    )
}