import { Header } from "../../components/Header";



export function PostPage() {
    return (
        <div className="w-screen h-screen flex flex-col bg-black-light ">
            <Header />

            {/* Body section */}
            <div className="w-full h-full flex justify-center p-5">


                <div className="w-full">
                    
                </div>

                {/* User data section */}
                <div className="w-5/12 h-fit p-5 gap-3   bg-white rounded-lg flex flex-col justify-center items-center font-K2D text-black">
                    {/*Image section  */}
                    <div className="w-44 h-44 bg-gray-500 rounded-full" />
                    <span className="font-semibold text-xl w-full text-center">Nome completo do usuário</span>

                    {/* Data section */}

                    <span className="text-lg w-full">Equipe: EQUIPE</span>
                    <span className="text-lg w-full">Função: FUNÇÃO</span>


                    <button className="bg-red-500 px-5 py-2 rounded-lg font-bold">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}