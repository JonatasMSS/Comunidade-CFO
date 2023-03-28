import { useState } from "react";



interface ICarrousel{
    children:Array<JSX.Element>;
    currentPage:number;
}

export function Carrousel({children,currentPage = 0}:ICarrousel){

    



    return(
        <div>
            {children[currentPage]}
        </div>
    )
}