import Robot from '../assets/icons/robot_Loader.svg';




export function Loader() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center  z-10 opacity-100">
            <img src={Robot} alt="Robot" className='w-32 h-32 opacity-100 animate-bounce' />
        </div>
    )
}