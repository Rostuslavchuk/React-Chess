import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import kingWhite from '../../assets/white-king.png'
import kingBlack from '../../assets/black-king.png'

export class King extends Figure{
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
        this.logo = color === Color.WHITE ? kingWhite : kingBlack
        this.figureName = FigureName.KING
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        if(this.cell.figure?.color === Color.BLACK){

            if(dx === 1 && dy === 1 && target.figure?.color === Color.WHITE){
                return true
            }
            if(dx === 1 && dy === 0 && target.figure?.color === Color.WHITE){
                return true
            }
            if(dx === 0 && dy === 1 && target.figure?.color === Color.WHITE){
                return true
            }

            if(this.cell.board.deletedWhiteFigures.length){   
                this.cell.board.deletedWhiteFigures.map(figure => {
                    if(figure.figureName === FigureName.KNIGHT){
                        if(figure.uniqValue === 1111){
                            target.whiteKnightLower = false
                        }
                        if(figure.uniqValue === 2222){
                            target.whiteKnightBigger = false
                        }
                        return true
                    }
                    if(figure.figureName === FigureName.ROOK){
                        if(figure.uniqValue === 5555){
                            target.whiteRookLower = false
                        }
                        if(figure.uniqValue === 6666){
                            target.whiteRookBigger = false
                        }
                        return true
                    }
                    if(figure.figureName === FigureName.BISHOP){
                        if(figure.uniqValue === 9999){
                            target.whiteBishopLower = false
                        }
                        if(figure.uniqValue === 1000){
                            target.whiteBishopBigger = false
                        }
                        return true
                    }
                    if(figure.figureName === FigureName.QUEEN){
                        target.whiteQueen = false
                        return true
                    }
                    if(figure.figureName === FigureName.PAWN){
                        target.whitePawn[figure.uniqValue!] = false
                        return true
                    }
                })
            }
            if((target.whiteBishopBigger || target.whiteBishopLower || 
                target.whiteKnightBigger|| target.whiteKnightLower || 
                target.whiteRookBigger || target.whiteRookLower || 
                target.whiteQueen || target.whiteKing)){
                    return false
            }
            for (let i = 0; i < target.whitePawn.length; i++) {
                if(target.whitePawn[i]){
                    return false  
                }
            }
        }



        if(this.cell.figure?.color === Color.WHITE){

            if(dx === 1 && dy === 1 && target.figure?.color === Color.BLACK){
                return true
            }
            if(dx === 1 && dy === 0 && target.figure?.color === Color.BLACK){
                return true
            }
            if(dx === 0 && dy === 1 && target.figure?.color === Color.BLACK){
                return true
            }

            if(this.cell.board.deletedWhiteFigures.length){   
                this.cell.board.deletedBlackFigures.map(figure => {
                    if(figure.figureName === FigureName.KNIGHT){
                        if(figure.uniqValue === 3333){ 
                            target.blackKnightLower = false
                        }
                        if(figure.uniqValue === 4444){
                            target.blackKnightBigger = false
                        }
                        return true
                    }
                    if(figure.figureName === FigureName.ROOK){
                        if(figure.uniqValue === 7777){
                            target.blackRookLower = false
                        }
                        if(figure.uniqValue === 8888){
                            target.blackRookBigger = false
                        }
                        return true
                    }
                    if(figure.figureName === FigureName.BISHOP){
                        if(figure.uniqValue === 1100){
                            target.blackBishopLower = false
                        }
                        if(figure.uniqValue === 1200){
                            target.blackBishopBigger = false
                        }
                        return true
                    }
                    if(figure.figureName === FigureName.QUEEN){
                        target.blackQueen = false
                        return true
                    }
                    if(figure.figureName === FigureName.PAWN){
                        target.blackPawn[figure.uniqValue!] = false
                        return true
                    }
                })
            }
            if((target.blackBishopBigger || target.blackBishopLower || 
                target.blackKnightBigger|| target.blackKnightLower || 
                target.blackRookBigger || target.blackRookLower || 
                target.blackQueen || target.blackKing)){
                    return false
            }
            for (let i = 0; i < target.whitePawn.length; i++) {
                if(target.blackPawn[i]){
                    return false  
                }
            }
        }
        
        if(dx === 1 && dy === 1){
            return true
        }
        if(dx === 1 && dy === 0){
            return true
        }
        if(dx === 0 && dy === 1){
            return true
        }
        return false

   }


    public canBlock(target: Cell){
        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        if(this.cell.figure?.color === Color.WHITE){
            if((dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dx === 1 && dy === 1)){
                target.whiteKing = true
                return true
            }    
            target.whiteKing = false
        }
        if(this.cell.figure?.color === Color.BLACK){
            if((dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dx === 1 && dy === 1)){
                target.blackKing = true
                return true
            }    
            target.blackKing = false
        }
    }
}