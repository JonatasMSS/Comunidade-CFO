


export function ForgotPasswordPage() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
            <div className=" text-white font-K2D p-5 w-1/2 flex flex-col bg-DF-black rounded-lg">
                <span className="font-bold text-xl w-full text-center"> Redefinição de senha!</span>
                <span className="font-light">Nós enviamos um <a target="_blank" href="https://gmail.com/" className="text-green-500 hover:text-green-400 hover:bg-zinc-900 hover:rounded-sm transition-all">email de redefinição de senha</a> para sua caixa de entrada. Confira-a e depois você pode continuar o acesso!</span>
            </div>
        </div>
    )
}