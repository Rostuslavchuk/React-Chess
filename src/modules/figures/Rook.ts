import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import rookWhite from '../../assets/white-rook.png'
import rookBlack from '../../assets/black-rook.png'

export class Rook extends Figure{
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
        this.logo = color === Color.WHITE ? rookWhite : rookBlack
        this.figureName = FigureName.ROOK
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        if(this.cell.moveVertical(target)){
            return true
        }
        if(this.cell.moveHorizontal(target)){
            return true
        }
        return false
   }

   public canBlock(target: Cell){
        if(this.cell.figure?.color === Color.WHITE){
            if(this.cell.moveHorizontalKingDisabledWhite(target)){
                if(this.uniqValue === 5555){
                    this.cell.whiteRookLower = false
                    target.whiteRookLower = true
                    return true
                }
                if(this.uniqValue === 6666){
                    this.cell.whiteRookBigger = false
                    target.whiteRookBigger = true
                    return true
                }
            }
            if(this.cell.moveVerticalKingDisabledWhite(target)){
                if(this.uniqValue === 5555){
                    this.cell.whiteRookLower = false
                    target.whiteRookLower = true
                    return true
                }
                if(this.uniqValue === 6666){
                    this.cell.whiteRookBigger = false
                    target.whiteRookBigger = true
                    return true
                }
            }

            if(this.cell.figure?.uniqValue === 5555){
                target.whiteRookLower = false      
            }
            if(this.cell.figure?.uniqValue === 6666){
                target.whiteRookBigger = false      
            }
        }

        if(this.cell.figure?.color === Color.BLACK){ 
            if(this.cell.moveHorizontalKingDisabledBlack(target)){
                if(this.uniqValue === 7777){
                    this.cell.blackRookLower = false
                    target.blackRookLower = true
                    return true
                }
                if(this.uniqValue === 8888){
                    this.cell.blackRookBigger = false
                    target.blackRookBigger = true
                    return true
                }
            }
            if(this.cell.moveVerticalKingDisabledBlack(target)){
                if(this.uniqValue === 7777){
                    this.cell.blackRookLower = false
                    target.blackRookLower = true
                    return true
                }
                if(this.uniqValue === 8888){
                    this.cell.blackRookBigger = false
                    target.blackRookBigger = true
                    return true
                }
            }
            if(this.cell.figure?.uniqValue === 7777){
                this.cell.blackRookLower = false      
                target.blackRookLower = false      
            }
            if(this.cell.figure?.uniqValue === 8888){
                this.cell.blackRookBigger = false      
                target.blackRookBigger = false      
            }
        }
    }
} 
