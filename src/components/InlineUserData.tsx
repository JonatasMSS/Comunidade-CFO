import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";




export function InlineUserData() {
    
    const user = useContext(AuthContext);
    
    

    return (
        <div className="flex gap-2 items-center">
            <span>{user?.email}</span>
            <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>
        </div>
    )
}