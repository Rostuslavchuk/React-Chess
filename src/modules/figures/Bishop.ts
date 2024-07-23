import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import bishopWhite from '../../assets/white-bishop.png'
import bishopBlack from '../../assets/black-bishop.png'

export class Bishop extends Figure{
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
        this.logo = color === Color.WHITE ? bishopWhite : bishopBlack
        this.figureName = FigureName.BISHOP
    }

    public canMove(target: Cell){
         if(!super.canMove(target)){
            return false 
         }   
         if(!this.cell.moveDiagonal(target)){
            return false
         }
         return true
    }
    public canBlock(target: Cell){
            if(this.cell.figure?.color === Color.WHITE){
                if(this.uniqValue === 9999){
                    if(this.cell.moveDiagonalKingDisabledWhite(target)){
                        this.cell.whiteBishopLower = false      
                        target.whiteBishopLower = true
                        return true
                    }
                }
                if(this.uniqValue === 1000){
                    if(this.cell.moveDiagonalKingDisabledWhite(target)){
                        this.cell.whiteBishopBigger = false      
                        target.whiteBishopBigger = true
                        return true
                    }
                }
                if(this.cell.figure?.uniqValue === 9999){
                    this.cell.whiteBishopLower = false      
                    target.whiteBishopLower = false      
                }
                if(this.cell.figure?.uniqValue === 1000){
                    this.cell.whiteBishopBigger = false      
                    target.whiteBishopBigger = false      
                }
            }
    
            if(this.cell.figure?.color === Color.BLACK){ 
                if(this.uniqValue === 1100){
                    if(this.cell.moveDiagonalKingDisabledBlack(target)){
                        this.cell.blackBishopLower = false
                        target.blackBishopLower = true
                        return true
                    }
                }
                if(this.uniqValue === 1200){
                    if(this.cell.moveDiagonalKingDisabledBlack(target)){
                        this.cell.blackBishopBigger = false
                        target.blackBishopBigger = true
                        return true
                    }
                }
                if(this.cell.figure?.uniqValue === 1100){
                    this.cell.blackBishopLower = false
                    target.blackBishopLower = false      
                }
                if(this.cell.figure?.uniqValue === 1200){
                    this.cell.blackBishopBigger = false
                    target.blackBishopBigger = false      
                }
            }
        }
    }    
