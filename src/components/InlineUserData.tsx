import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import FB_Auth from "../routes/firebase_auth";




export function InlineUserData() {
    
    const user = useContext(AuthContext);
    
    

    return (
        <div className="flex gap-2 items-center">
            <span>{user?.email}</span>
            {FB_Auth.currentUser?.photoURL ? <img src={FB_Auth.currentUser.photoURL} className="w-8 rounded-full"/> : <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>}
        </div>
    )
}