import { Link } from "react-router-dom";
import { InlineUserData } from "./InlineUserData";




export function Header(){
    return(
        <div className="w-full flex items-center justify-between bg-black font-K2D p-3 text-white">
                <Link to={'/posts'} replace={true} >FC Brasil</Link>
                <InlineUserData/>
        </div>
    )
}