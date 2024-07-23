import { Cell } from "../Cell";
import { Color } from "../Color";
import logo from '../../assets/black-bishop.png'

export enum FigureName {
    PAWN = 'пішак',
    KING = 'король',
    KNIGHT = 'кінь',
    QUEEN = 'королева',
    BISHOP = 'офіцер',
    ROOK = 'тура'
}
interface XY{
    x: number
    y: number
}


export abstract class Figure{
    cell: Cell
    color: Color
    logo: typeof logo | null
    figureName: FigureName
    id: number
    castingAvailable: boolean | null
    uniqValue: number | null

    cellBlackProtect: Cell;
    cellWhiteAttack: Figure
    

    constructor(color: Color, cell: Cell, uniqValue: number | null ) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.castingAvailable = true
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
        this.uniqValue = uniqValue

        this.cellBlackProtect = this.cell;
        this.cellWhiteAttack = this;
    }
    
    public canMove(target: Cell){

    if(this.cell.figure?.figureName === FigureName.KING && this.cell.figure.color === Color.BLACK){
        if(target.figure?.color === Color.WHITE && (target.whiteBishopBigger || target.whiteBishopLower || 
            target.whiteKnightBigger || target.whiteKnightLower || 
            target.whiteRookBigger || target.whiteRookLower || 
            target.whiteQueen || target.whiteKing)){
                return false
        }
        for (let i = 0; i < target.whitePawn.length; i++) {
            if(target.figure?.color === Color.WHITE && target.whitePawn[i]){
                return false  
            }
        }
    }

    if(this.cell.figure?.figureName === FigureName.KING && this.cell.figure.color === Color.WHITE){
        if(target.figure?.color === Color.BLACK && (target.blackBishopBigger || target.blackBishopLower || 
            target.blackKnightBigger|| target.blackKnightLower || 
            target.blackRookBigger || target.blackRookLower || 
            target.blackQueen || target.blackKing)){
                return false
        }
        for (let i = 0; i < target.whitePawn.length; i++) {
            if(target.figure?.color === Color.BLACK && target.blackPawn[i]){
                return false  
            }
        }
    }
    

    let kingBlack: XY = {x: 3, y: 0};
    let kingWhite: XY = {x: 3, y: 7};

    if(target.board.arrayWhiteFiguresBlock.length){
        this.cell.board.arrayWhiteFiguresBlock.map(figureMain => {
            
            if(target.figure?.figureName === FigureName.KING && target.figure.color === Color.BLACK){
                kingBlack = {x: target.x, y: target.y}
            }

            if(figureMain.figure?.figureName === FigureName.QUEEN || this.cell){ 

                if(target.blockFigureMovementDiagonalQueen(figureMain.figure?.cell, kingBlack) ||
                target.blockFigureMovementVerticalQueen(figureMain.figure?.cell, kingBlack) ||
                target.blockFigureMovementHorizontalQueen(figureMain.figure?.cell, kingBlack)){

                    let Diagonal = target.blockFigureMovementDiagonalQueen(figureMain.figure?.cell, kingBlack)
                    let Vertical = target.blockFigureMovementVerticalQueen(figureMain.figure?.cell, kingBlack)
                    let Horizontal = target.blockFigureMovementHorizontalQueen(figureMain.figure?.cell, kingBlack)

                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true

                            this.cellBlackProtect= Diagonal.cell;
                            this.cellWhiteAttack = figureMain.figure;
                        }
                        else{ 
                            if(Diagonal.cell){
                                Diagonal.cell.block = false
                             }                           
                        }
                    }
                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            this.cellBlackProtect= Vertical.cell;
                            this.cellWhiteAttack = figureMain.figure;
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            this.cellBlackProtect = Horizontal.cell;
                            this.cellWhiteAttack = figureMain.figure;
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                }
            }

            if(figureMain.figure?.figureName === FigureName.ROOK || this.cell){

                if(target.blockFigureMovementVerticalRook(figureMain.figure?.cell , kingBlack) ||
                target.blockFigureMovementHorizontalRook(figureMain.figure?.cell , kingBlack)){

                    const Vertical = target.blockFigureMovementVerticalRook(figureMain.figure?.cell, kingBlack)
                    const Horizontal = target.blockFigureMovementHorizontalRook(figureMain.figure?.cell, kingBlack)

                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            this.cellBlackProtect = Vertical.cell;
                            this.cellWhiteAttack = figureMain.figure;
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                                this.cellBlackProtect = Horizontal.cell;
                                this.cellWhiteAttack = figureMain.figure;
                            
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                  }
                }

                if(figureMain.figure?.figureName === FigureName.BISHOP || this.cell){

                    if(target.blockFigureMovementDiagonalBishop(figureMain.figure?.cell, kingBlack)){
                        const Diagonal = target.blockFigureMovementDiagonalBishop(figureMain.figure?.cell, kingBlack)

                        if(Diagonal){
                            if(Diagonal.bool){
                                Diagonal.cell.block = true

                                this.cellBlackProtect = Diagonal.cell
                                this.cellWhiteAttack = figureMain.figure;
                            }
                            else{ 
                                if(Diagonal.cell){
                                    Diagonal.cell.block = false
                                 }                           
                            }
                        }
                    }
                }
            })
        }
        if(this.cell.block){
                if(this.cell.DiagonalKill(this.cell, target)){
                    return true
                }
                return false
                // if(this.cell.x === this.cellWhiteAttack.x){
                //     if(this.cell.VerticalKill(this.cell, target)){
                //         return true
                //     }
                // }
                // if(this.cell.y === this.cellWhiteAttack.y){
                //     if(this.cell.HorizontalKill(this.cell, target)){
                //         return true
                //     }
                // }
        }

    if(target.board.arrayBlackFiguresBlock.length){
        this.cell.board.arrayBlackFiguresBlock.map(figureMain => {

            if(target.figure?.figureName === FigureName.KING && target.figure.color === Color.WHITE){
                kingWhite = {x: target.x, y: target.y}
            }

            if(figureMain.figure?.figureName === FigureName.QUEEN || this.cell){
                
                if(target.blockFigureMovementDiagonalQueenBlack(figureMain.figure?.cell, kingWhite) ||
                target.blockFigureMovementVerticalQueenBlack(figureMain.figure?.cell, kingWhite) ||
                target.blockFigureMovementHorizontalQueenBlack(figureMain.figure?.cell, kingWhite)){

                    let Diagonal = target.blockFigureMovementDiagonalQueenBlack(figureMain.figure?.cell, kingWhite)
                    let Vertical = target.blockFigureMovementVerticalQueenBlack(figureMain.figure?.cell, kingWhite)
                    let Horizontal = target.blockFigureMovementHorizontalQueenBlack(figureMain.figure?.cell, kingWhite)

                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true
                        }
                        else{ 
                            if(Diagonal.cell){
                                Diagonal.cell.block = false
                             }                           
                        }
                    }
                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                }
            }
            if(figureMain.figure?.figureName === FigureName.ROOK || this.cell){
                
                if(target.blockFigureMovementVerticalRookBlack(figureMain.figure?.cell, kingWhite) ||
                target.blockFigureMovementHorizontalRookBlack(figureMain.figure?.cell, kingWhite)){
                    const Vertical = target.blockFigureMovementVerticalRookBlack(figureMain.figure?.cell, kingWhite)
                    const Horizontal = target.blockFigureMovementHorizontalRookBlack(figureMain.figure?.cell, kingWhite)

                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                }
            }
            if(figureMain?.figure?.figureName === FigureName.BISHOP || this.cell){    
                if(target.blockFigureMovementDiagonalBishopBlack(figureMain.figure?.cell, kingWhite)){

                    const Diagonal = target.blockFigureMovementDiagonalBishopBlack(figureMain.figure?.cell, kingWhite)

                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true
                        }
                        else{ 
                            if(Diagonal.cell){
                                Diagonal.cell.block = false
                             }                           
                        }
                    }
                }
            }
        })
    }


        if(this.cell.board.arrayBlackFiguresKingMovement.length){
            this.cell.board.arrayBlackFiguresKingMovement.map(figure => {
                if(figure?.figureName === FigureName.QUEEN){
                    if(target.kingMovementBlackDiagonal(figure.cell) ||
                    target.kingMovementBlackVertical(figure.cell) ||
                    target.kingMovementBlackHorizontal(figure.cell)){
                        target.blackQueen = false
                        return true
                    }
                }
                if(figure?.figureName === FigureName.BISHOP){
                    if(target.kingMovementBlackDiagonal(figure.cell)){
                        if(figure.uniqValue === 1100){
                            target.blackBishopLower = false
                        }
                        if(figure.uniqValue === 1200){
                            target.blackBishopBigger = false
                        }
                        return true
                    }
                }
                if(figure?.figureName === FigureName.ROOK){
                    if(target.kingMovementBlackVertical(figure.cell) || target.kingMovementBlackHorizontal(figure.cell)){
                        if(figure.uniqValue === 7777){
                            target.blackRookLower = false
                        }
                        if(figure.uniqValue === 8888){
                            target.blackRookBigger = false
                        }
                        return true
                    }
                }
            }) 
        }
    


        if(this.cell.board.arrayWhiteFiguresKingMovement.length){
            this.cell.board.arrayWhiteFiguresKingMovement.map(figure => {
                if(figure?.figureName === FigureName.QUEEN){
                    if(target.kingMovementWhiteDiagonal(figure.cell) 
                    || target.kingMovementWhiteVertical(figure.cell) 
                    || target.kingMovementWhiteHorizontal(figure.cell)){
                        target.whiteQueen = false
                    }                        
                    return true
                }
                if(figure?.figureName === FigureName.BISHOP){
                    if(target.kingMovementWhiteDiagonal(figure.cell)) {
                        if(figure.uniqValue === 9999){
                            target.whiteBishopLower = false
                        }
                        if(figure.uniqValue === 1000){
                            target.whiteBishopBigger = false
                        }
                        return true
                    }
                }
                if(figure?.figureName === FigureName.ROOK){
                    if(target.kingMovementWhiteVertical(figure.cell) 
                    || target.kingMovementWhiteHorizontal(figure.cell)){
                        if(figure.uniqValue === 5555){
                            target.whiteRookLower = false
                        }
                        if(figure.uniqValue === 6666){
                            target.whiteRookBigger = false
                        }
                        return true
                    }
                }
            }) 
        }


        if(this.castingAvailable && this?.figureName === FigureName.ROOK
        && 
        (this.cell.figure?.color === Color.WHITE || this.cell.figure?.color === Color.BLACK) 
        && 
        ((this.cell.y === 7 && this.cell.x === 0) || 
        (this.cell.y === 7 && this.cell.x === 7)  || 
        (this.cell.y === 0 && this.cell.x === 7) || 
        (this.cell.y === 0 && this.cell.x === 0) 
        && 
        ((target.y === 0 && target.x === 3) || 
        (target.y === 7 && target.x === 3)))
        &&
        target.figure?.figureName === FigureName.KING
        &&
        (target.figure?.color === Color.BLACK || target.figure?.color === Color.WHITE)
        ){
            setTimeout(() => {
                this.castingAvailable = false
            }, 100)
            return true
        }
        if((this.cell.figure?.figureName === FigureName.ROOK && target.figure?.figureName === FigureName.KING) && this.cell.figure?.color === target.figure?.color){
            return true
        }   

        if(this.cell.figure?.color === target.figure?.color){
            return false
        }

        if(target.figure?.figureName === FigureName.KING){
            return false
        }

        return true
    }
    public canBlock(target: Cell){
 
    }

    public PawnStart(target: Cell){

    }
}