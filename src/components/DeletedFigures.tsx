import React, {FC} from "react";
import { Figure } from "../modules/figures/Figure";
import { Color } from "../modules/Color";
import { Player } from "../modules/Player";

interface DeleteFiguresProps {
    deletedFigures: Figure[]
    title: string
    color: Player 
}

const DeletedFigures:FC<DeleteFiguresProps> = ({deletedFigures, title, color}) => {
    
    return (
        <div className="deleted__figures">
            <h1 style={{color: color.color === Color.WHITE ? 'white' : 'black'}}>{title}</h1>
            {deletedFigures.map(figure => (
               <span key={figure.id} className="figures">
                   {figure.figureName}:{figure.logo && <img src={figure.logo} width={30} height={30} />},&ensp; 
               </span>
           ))} 
        </div>
    )
}
export default DeletedFigures