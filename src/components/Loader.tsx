import Robot from '../assets/icons/robot_Loader.svg';




export function Loader() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center fixed bg-zinc-800/80 z-10 opacity-100">
            <img src={Robot} alt="Robot" className='w-32 h-32 opacity-100 animate-bounce' />
        </div>
    )
}