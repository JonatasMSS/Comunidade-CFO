


export function CommentItem() {
    return (

        < div className=" w-full flex flex-col bg-white min-h-[8rem] rounded-lg font-K2D p-2 " >
            {/* User data */}
            < div className=" flex gap-2" >
                <span className="font-bold">Nome de usuário</span>
                <span className="font-light">Equipe</span>
                <span className="font-extralight text-zinc-700 bg-zinc-300 truncate rounded-sm px-1">Tempo de postagem</span>
            </div >
            <p className="text-xs sm:text-base font-extralight my-2 break-words ">
                {
                    Array.from({ length: 500 }).map(e => 'a')
                }
            </p>


        </div >
    )
}