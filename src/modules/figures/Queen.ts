import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import queenWhite from '../../assets/white-queen.png'
import queenBlack from '../../assets/black-queen.png'

export class Queen extends Figure{
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
        this.logo = color === Color.WHITE ? queenWhite : queenBlack
        this.figureName = FigureName.QUEEN
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }  

            if(this.cell.moveHorizontal(target)){   
                return true
            }
            if(this.cell.moveVertical(target)){
                return true
            }
            if(this.cell.moveDiagonal(target)){
                return true
            }
            return false

   }
    public canBlock(target: Cell){
        if(this.cell.figure?.color === Color.WHITE){
            if(this.cell.moveDiagonalKingDisabledWhite(target)){
                this.cell.whiteQueen = false
                target.whiteQueen = true
                return true
            }
            if(this.cell.moveHorizontalKingDisabledWhite(target)){
                this.cell.whiteQueen = false
                target.whiteQueen = true
                return true
            }
            if(this.cell.moveVerticalKingDisabledWhite(target)){  
                this.cell.whiteQueen = false
                target.whiteQueen = true
                return true
            }
            target.whiteQueen = false
            return false
        }

        if(this.cell.figure?.color === Color.BLACK){ 
            if(this.cell.moveDiagonalKingDisabledBlack(target)){
                this.cell.blackQueen = false
                target.blackQueen = true
                return true
            }
            if(this.cell.moveHorizontalKingDisabledBlack(target)){
                this.cell.blackQueen = false
                target.blackQueen = true
                return true
            }
            if(this.cell.moveVerticalKingDisabledBlack(target)){  
                this.cell.blackQueen = false
                target.blackQueen = true
                return true
            }
            target.blackQueen = false
            return false
        }
    }
}
