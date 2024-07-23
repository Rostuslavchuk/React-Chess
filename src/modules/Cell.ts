import { type } from "os"
import { Board } from "./Board"
import { Color } from "./Color"
import { Figure, FigureName } from "./figures/Figure"
import { King } from "./figures/King"
import { Rook } from "./figures/Rook"

interface XY {
    x: number
    y: number
}
interface XYCastling {
    kingX: number
    rookX: number
}

export class Cell{
        board: Board
        figure: Figure | null
        color: Color
        x: number
        y: number
        available: boolean


        block: boolean

        cellDiagonalQueen: Cell | null
        cellVerticalQueen: Cell | null
        cellHorizontalQueen: Cell | null
        
        cellVerticalRook: Cell | null
        cellHorizontalRook: Cell | null

        cellDiagonalBishop: Cell | null

        deletedDiagonalQueen: Cell | null
        counterDiagonalQueen: number

        deletedVerticalQueen: Cell | null
        counterVerticalQueen: number

        deletedHorizontalQueen: Cell | null
        counterHorizontalQueen: number


        deletedVerticalRook: Cell | null
        counterVerticalRook: number

        deletedHorizontalRook: Cell | null
        counterHorizontalRook: number

        deletedDiagonalBishop: Cell | null
        counterDiagonalBishop: number



        cellDiagonalQueenBlack: Cell | null
        cellVerticalQueenBlack: Cell | null
        cellHorizontalQueenBlack: Cell | null
        
        cellVerticalRookBlack: Cell | null
        cellHorizontalRookBlack: Cell | null

        cellDiagonalBishopBlack: Cell | null

        deletedDiagonalQueenBlack: Cell | null
        counterDiagonalQueenBlack: number

        deletedVerticalQueenBlack: Cell | null
        counterVerticalQueenBlack: number

        deletedHorizontalQueenBlack: Cell | null
        counterHorizontalQueenBlack: number


        deletedVerticalRookBlack: Cell | null
        counterVerticalRookBlack: number

        deletedHorizontalRookBlack: Cell | null
        counterHorizontalRookBlack: number

        deletedDiagonalBishopBlack: Cell | null
        counterDiagonalBishopBlack: number





        whitePawn: Array<boolean>
        blackPawn: Array<boolean>

        whiteQueen: boolean
        blackQueen: boolean

        whiteKing: boolean
        blackKing: boolean

        whiteRookLower: boolean
        blackRookLower: boolean
        whiteRookBigger: boolean
        blackRookBigger: boolean

        whiteBishopLower: boolean
        blackBishopLower: boolean
        whiteBishopBigger: boolean
        blackBishopBigger: boolean

        whiteKnightLower: boolean
        whiteKnightBigger: boolean
        blackKnightLower: boolean
        blackKnightBigger: boolean

        id: number

        constructor(board: Board, y: number, x: number,color: Color, figure: Figure | null){
            this.board = board
            this.y = y
            this.x = x
            this.figure = figure
            this.color = color
            this.available = false
            this.id = Math.random()



            this.block = false

            this.cellDiagonalQueen = null
            this.cellVerticalQueen = null
            this.cellHorizontalQueen = null
            
            this.cellVerticalRook = null
            this.cellHorizontalRook = null

            this.cellDiagonalBishop = null
            
            this.deletedDiagonalQueen = null
            this.counterDiagonalQueen = 0

            this.deletedVerticalQueen = null
            this.counterVerticalQueen = 0
    
            this.deletedHorizontalQueen = null
            this.counterHorizontalQueen = 0


            this.deletedVerticalRook = null
            this.counterVerticalRook = 0
    
            this.deletedHorizontalRook = null
            this.counterHorizontalRook = 0


            this.deletedDiagonalBishop = null
            this.counterDiagonalBishop = 0




            this.cellDiagonalQueenBlack = null
            this.cellVerticalQueenBlack = null
            this.cellHorizontalQueenBlack = null
            
            this.cellVerticalRookBlack = null
            this.cellHorizontalRookBlack = null

            this.cellDiagonalBishopBlack = null
            
            this.deletedDiagonalQueenBlack = null
            this.counterDiagonalQueenBlack = 0

            this.deletedVerticalQueenBlack = null
            this.counterVerticalQueenBlack = 0
    
            this.deletedHorizontalQueenBlack = null
            this.counterHorizontalQueenBlack = 0


            this.deletedVerticalRookBlack = null
            this.counterVerticalRookBlack = 0
    
            this.deletedHorizontalRookBlack = null
            this.counterHorizontalRookBlack = 0


            this.deletedDiagonalBishopBlack = null
            this.counterDiagonalBishopBlack = 0



            this.whiteQueen = false
            this.blackQueen = false

            this.whiteKing = false
            this.blackKing = false

            this.whiteRookLower = false
            this.blackRookLower = false
            this.whiteRookBigger = false
            this.blackRookBigger = false

            this.whiteBishopLower = false
            this.blackBishopLower = false
            this.whiteBishopBigger = false
            this.blackBishopBigger = false

            this.whiteKnightLower = false
            this.whiteKnightBigger = false
            this.blackKnightLower = false
            this.blackKnightBigger = false

            this.whitePawn = [false, false, false, false, false, false, false, false];
            this.blackPawn = [false, false, false, false, false, false, false, false];
        }

        move(figure: Figure){
            this.figure = figure
            this.figure.cell = this
        }

        setDeletedFigures(target: Figure){
            if(target?.color === Color.BLACK && target.figureName !== FigureName.KING){
                this.board.deletedBlackFigures.push(target)
            }
            if(target?.color === Color.WHITE && target.figureName !== FigureName.KING){
                this.board.deletedWhiteFigures.push(target)
            }
        }

        moveFigure(target: Cell){
            if(this.figure && this.figure?.canMove(target)){
                if(target.figure){
                    this.setDeletedFigures(target.figure)
                }    
                        
                target.move(this.figure!)
                this.figure?.PawnStart(target);
                this.figure = null
            }
        }

            VerticalKill(start: Cell, end: Cell){
                
                if(start.x !== end.x){
                    return false
                }
                const dY = Math.abs(start.y - end.y)

                const directionY = start.y < end.y ? 1 : -1;

                for(let i = 1; i <= dY; i++){
                    if(this.board.getCell(start.y + (i * directionY), start.x).isEmpty()
                    && this.board.getCell(start.y + (i * directionY), start.x).figure?.color !== start.figure?.color){
                        return true
                    }
                }
                return false
            }
            HorizontalKill(start: Cell, end: Cell){

                if(start.y !== end.y){
                    return false
                }
                const dX = Math.abs(start.x - end.x)

                const directionX = start.x < end.x ? 1 : -1;

                for(let i = 1; i <= dX; i++){
                    if(this.board.getCell(start.y, start.x + (i * directionX)).isEmpty()
                    && this.board.getCell(start.y, start.x + (i * directionX)).figure?.color !== start.figure?.color){
                        return true
                    }
                }
                return false
            }
            
            DiagonalKill(start: Cell, end: Cell){
                    const dx = start.x - end.x;
                    const dy = start.y - end.y;

                    const directionX = start.x < end.x ? 1 : -1;    
                    const directionY = start.y < end.y ? 1 : -1;

                    if(Math.abs(dx) !== Math.abs(dy)){
                        return false
                    }
                    if(this.figure!.cell.x > this.figure?.cellWhiteAttack.cell.x! && ((dx > 0 && dy < 0) || (dx > 0 && dy < 0))){
                        for(let i = 1; i <= Math.abs(dx); i++){
                            if(this.board.getCell(start.y + (i * directionY), start.x + (i * directionX)).isEmpty()){
                                return true
                            }
                        }
                        return false
                    }
                    if(start.x < this.figure?.cellWhiteAttack.cell.x! && ((dx < 0 && dy < 0) || (dx > 0 && dy > 0))){
                        for(let i = 1; i <= Math.abs(dy); i++){
                            if(this.board.getCell(start.y + (i * directionY), start.x + (i * directionX)).isEmpty()){
                                return true
                            }
                        }
                        return false
                    }
                    return false
            }

            blockFigureMovementDiagonalQueen(figure: Cell, king: XY){
                this.counterDiagonalQueen = this.counterDiagonalQueen + 1
                
                if(this.counterDiagonalQueen === 1){
                   this.deletedDiagonalQueen = figure   
                }

                let item: Cell;
                const dx = Math.abs(figure.x - king.x);
                const dy = Math.abs(figure.y - king.y);

                const directionX = king.x < figure.x ? -1 : 1;    
                const directionY = king.y < figure.y ? -1 : 1;
                
                let arrayFigures: Array<Cell> = [];

                    if(dx !== dy){
                        if(this.cellDiagonalQueen){
                            return {cell: this.cellDiagonalQueen, bool: false}
                        }
                        return {cell: this.cellDiagonalQueen!, bool: false}
                    }
                    
                for (let i = 1; i <= dy; i++) {                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellDiagonalQueen!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX))
                        arrayFigures.push(item)                   
                    }
                }

                arrayFigures.push(figure)

                if(arrayFigures.length === 3 && dx === dy && this.deletedDiagonalQueen === arrayFigures[2]){
                    this.cellDiagonalQueen = arrayFigures[0]
                    this.deletedDiagonalQueen = null
                    this.counterDiagonalQueen = 0
                    return {cell: arrayFigures[0], bool: true}
                }
                else{
                    const newA = arrayFigures.filter(el => el.block === true)
                    this.deletedDiagonalQueen = null
                    this.counterDiagonalQueen = 0
                    return {cell: newA[0], bool: false}
                }
            }
            blockFigureMovementVerticalQueen(figure: Cell, king: XY){
                this.counterVerticalQueen = this.counterVerticalQueen + 1
                if(this.counterVerticalQueen === 1){
                    this.deletedVerticalQueen = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionY = king.y < figure.y ? -1 : 1;  
                
                const dy = Math.abs(figure.y - king.y);    
                
                if(figure.x !== king.x){
                    if(this.cellVerticalQueen){
                        return {cell: this.cellVerticalQueen, bool: false}
                    }
                    return {cell: this.cellVerticalQueen!, bool: false}
                }

                for (let i = 1; i <= dy; i++) {
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x).figure?.color === figure.figure?.color){
                            return {cell: this.cellVerticalQueen!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x)
                        arrayCell.push(item)
                    }
                }

                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.x === king.x && this.deletedVerticalQueen === arrayCell[2]){
                    this.cellVerticalQueen = arrayCell[0]

                    this.deletedVerticalQueen = null
                    this.counterVerticalQueen = 0

                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedVerticalQueen = null
                    this.counterVerticalQueen = 0
                    
                    return {cell: newA[0], bool: false}
                } 
            }
            blockFigureMovementHorizontalQueen(figure: Cell, king: XY){
                this.counterHorizontalQueen = this.counterHorizontalQueen + 1
                if(this.counterHorizontalQueen === 1){
                    this.deletedHorizontalQueen = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionX = king.x < figure.x ? -1 : 1;  
                const dx = Math.abs(figure.x - king.x);    
                
                if(figure.y !== king.y){
                    if(this.cellHorizontalQueen){
                        return {cell: this.cellHorizontalQueen, bool: false}
                    }
                    return {cell: this.cellHorizontalQueen!, bool: false}
                }

                for (let i = 1; i <= dx; i++) {
                    if(!this.board.getCell(figure.y, figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y, figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellHorizontalQueen!, bool: false}
                        }
                        item = this.board.getCell(figure.y, figure.x + (i * directionX))
                        arrayCell.push(item)
                    }
                }
                
                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.y === king.y && this.deletedHorizontalQueen === arrayCell[2]){

                    this.cellHorizontalQueen = arrayCell[0]
                    this.deletedHorizontalQueen = null
                    this.counterHorizontalQueen = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedHorizontalQueen = null
                    this.counterHorizontalQueen = 0
                    return {cell: newA[0], bool: false}
                } 
            }



            blockFigureMovementVerticalRook(figure: Cell, king: XY){
                this.counterVerticalRook = this.counterVerticalRook + 1
                if(this.counterVerticalRook === 1){
                    this.deletedVerticalRook = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionY = king.y < figure.y ? -1 : 1;  
                
                const dy = Math.abs(figure.y - king.y);    
                
                if(figure.x !== king.x){
                    if(this.cellVerticalRook){
                        return {cell: this.cellVerticalRook, bool: false}
                    }
                    return {cell: this.cellVerticalRook!, bool: false}
                }

                for (let i = 1; i <= dy; i++) {
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x).figure?.color === figure.figure?.color){
                            return {cell: this.cellVerticalRook!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x)
                        arrayCell.push(item)
                    }
                }

                arrayCell.push(figure)
                

                if(arrayCell.length === 3 && figure.x === king.x && this.deletedVerticalRook === arrayCell[2]){
                    this.cellVerticalRook = arrayCell[0]

                    this.deletedVerticalRook = null
                    this.counterVerticalRook = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedVerticalRook = null
                    this.counterVerticalRook = 0
                    
                    return {cell: newA[0], bool: false}
                } 
            }
            blockFigureMovementHorizontalRook(figure: Cell, king: XY){
                this.counterHorizontalRook = this.counterHorizontalRook + 1
                if(this.counterHorizontalRook === 1){
                    this.deletedHorizontalRook = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionX = king.x < figure.x ? -1 : 1;  
                const dx = Math.abs(figure.x - king.x);    
                
                if(figure.y !== king.y){
                    if(this.cellHorizontalRook){
                        return {cell: this.cellHorizontalRook, bool: false}
                    }
                    return {cell: this.cellHorizontalRook!, bool: false}
                }

                for (let i = 1; i <= dx; i++) {
                    if(!this.board.getCell(figure.y, figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y, figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellHorizontalRook!, bool: false}
                        }
                        item = this.board.getCell(figure.y, figure.x + (i * directionX))
                        arrayCell.push(item)
                    }
                }
                
                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.y === king.y && this.deletedHorizontalRook === arrayCell[2]){

                    this.cellHorizontalRook = arrayCell[0]
                    this.deletedHorizontalRook = null
                    this.counterHorizontalRook = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedHorizontalRook = null
                    this.counterHorizontalRook = 0
                    return {cell: newA[0], bool: false}
                } 
            }


            blockFigureMovementDiagonalBishop(figure: Cell, king: XY){
                this.counterDiagonalBishop = this.counterDiagonalBishop + 1
                if(this.counterDiagonalBishop === 1){
                   this.deletedDiagonalBishop = figure   
                }
                
                const dx = Math.abs(figure.x - king.x);
                const dy = Math.abs(figure.y - king.y);

                const directionX = king.x < figure.x ? -1 : 1;    
                const directionY = king.y < figure.y ? -1 : 1;
                
                let arrayFigures: Array<Cell> = [];

                    if(dx !== dy){
                        if(this.cellDiagonalBishop){
                            return {cell: this.cellDiagonalBishop, bool: false}
                        }
                        return {cell: this.cellDiagonalBishop!, bool: false}
                    }

                for (let i = 1; i <= dy; i++) {                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellDiagonalBishop!, bool: false}
                        }
                        arrayFigures.push(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)))                   
                    }
                }

                arrayFigures.push(figure)
                
                if(arrayFigures.length === 3 && dx === dy && this.deletedDiagonalBishop === arrayFigures[2]){
                    this.cellDiagonalBishop = arrayFigures[0]
                    this.deletedDiagonalBishop = null
                    this.counterDiagonalBishop = 0
                    return {cell: arrayFigures[0], bool: true}
                }
                else{
                    const newA = arrayFigures.filter(el => el.block === true)
                    this.deletedDiagonalBishop = null
                    this.counterDiagonalBishop = 0
                    return {cell: newA[0], bool: false}
                }
            }



            
            blockFigureMovementDiagonalQueenBlack(figure: Cell, king: XY){

                this.counterDiagonalQueenBlack = this.counterDiagonalQueenBlack + 1
                if(this.counterDiagonalQueenBlack === 1){
                   this.deletedDiagonalQueenBlack = figure   
                }
                
                const dx = Math.abs(figure.x - king.x);
                const dy = Math.abs(figure.y - king.y);

                const directionX = king.x < figure.x ? -1 : 1;    
                const directionY = king.y < figure.y ? -1 : 1;
                
                let arrayFigures: Array<Cell> = [];

                    if(dx !== dy){
                        if(this.cellDiagonalQueenBlack){
                            return {cell: this.cellDiagonalQueenBlack, bool: false}
                        }
                        return {cell: this.cellDiagonalQueenBlack!, bool: false}
                    }

                for (let i = 1; i <= dy; i++) {                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellDiagonalQueenBlack!, bool: false}
                        }
                        arrayFigures.push(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)))                   
                    }
                }

                arrayFigures.push(figure)
                
                if(arrayFigures.length === 3 && dx === dy && this.deletedDiagonalQueenBlack === arrayFigures[2]){
                    this.cellDiagonalQueenBlack = arrayFigures[0]
                    this.deletedDiagonalQueenBlack = null
                    this.counterDiagonalQueenBlack = 0
                    return {cell: arrayFigures[0], bool: true}
                }
                else{
                    const newA = arrayFigures.filter(el => el.block === true)
                    this.deletedDiagonalQueenBlack = null
                    this.counterDiagonalQueenBlack = 0
                    return {cell: newA[0], bool: false}
                }
            }
            blockFigureMovementVerticalQueenBlack(figure: Cell, king: XY){
                this.counterVerticalQueenBlack = this.counterVerticalQueenBlack + 1
                if(this.counterVerticalQueenBlack === 1){
                    this.deletedVerticalQueenBlack = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionY = king.y < figure.y ? -1 : 1;  
                
                const dy = Math.abs(figure.y - king.y);    
                
                if(figure.x !== king.x){
                    if(this.cellVerticalQueenBlack){
                        return {cell: this.cellVerticalQueenBlack, bool: false}
                    }
                    return {cell: this.cellVerticalQueenBlack!, bool: false}
                }

                for (let i = 1; i <= dy; i++) {
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x).figure?.color === figure.figure?.color){
                            return {cell: this.cellVerticalQueenBlack!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x)
                        arrayCell.push(item)
                    }
                }

                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.x === king.x && this.deletedVerticalQueenBlack === arrayCell[2]){
                    this.cellVerticalQueenBlack = arrayCell[0]

                    this.deletedVerticalQueenBlack = null
                    this.counterVerticalQueenBlack = 0

                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedVerticalQueenBlack = null
                    this.counterVerticalQueenBlack = 0
                    
                    return {cell: newA[0], bool: false}
                } 
            }
            blockFigureMovementHorizontalQueenBlack(figure: Cell, king: XY){
                this.counterHorizontalQueenBlack = this.counterHorizontalQueenBlack + 1
                if(this.counterHorizontalQueenBlack === 1){
                    this.deletedHorizontalQueenBlack = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionX = king.x < figure.x ? -1 : 1;  
                const dx = Math.abs(figure.x - king.x);    
                
                if(figure.y !== king.y){
                    if(this.cellHorizontalQueenBlack){
                        return {cell: this.cellHorizontalQueenBlack, bool: false}
                    }
                    return {cell: this.cellHorizontalQueenBlack!, bool: false}
                }

                for (let i = 1; i <= dx; i++) {
                    if(!this.board.getCell(figure.y, figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y, figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellHorizontalQueenBlack!, bool: false}
                        }
                        item = this.board.getCell(figure.y, figure.x + (i * directionX))
                        arrayCell.push(item)
                    }
                }
                
                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.y === king.y && this.deletedHorizontalQueenBlack === arrayCell[2]){

                    this.cellHorizontalQueenBlack = arrayCell[0]
                    this.deletedHorizontalQueenBlack = null
                    this.counterHorizontalQueenBlack = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedHorizontalQueenBlack = null
                    this.counterHorizontalQueenBlack = 0
                    return {cell: newA[0], bool: false}
                } 
            }



            blockFigureMovementVerticalRookBlack(figure: Cell, king: XY){
                this.counterVerticalRookBlack = this.counterVerticalRookBlack + 1
                if(this.counterVerticalRookBlack === 1){
                    this.deletedVerticalRookBlack = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionY = king.y < figure.y ? -1 : 1;  
                
                const dy = Math.abs(figure.y - king.y);    
                
                if(figure.x !== king.x){
                    if(this.cellVerticalRookBlack){
                        return {cell: this.cellVerticalRookBlack, bool: false}
                    }
                    return {cell: this.cellVerticalRookBlack!, bool: false}
                }

                for (let i = 1; i <= dy; i++) {
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x).figure?.color === figure.figure?.color){
                            return {cell: this.cellVerticalRookBlack!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x)
                        arrayCell.push(item)
                    }
                }

                arrayCell.push(figure)
                

                if(arrayCell.length === 3 && figure.x === king.x && this.deletedVerticalRookBlack === arrayCell[2]){
                    this.cellVerticalRookBlack = arrayCell[0]
                    
                    this.deletedVerticalRookBlack = null
                    this.counterVerticalRookBlack = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedVerticalRookBlack = null
                    this.counterVerticalRookBlack = 0
                    
                    return {cell: newA[0], bool: false}
                } 
            }
            blockFigureMovementHorizontalRookBlack(figure: Cell, king: XY){
                this.counterHorizontalRookBlack = this.counterHorizontalRookBlack + 1
                if(this.counterHorizontalRookBlack === 1){
                    this.deletedHorizontalRookBlack = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionX = king.x < figure.x ? -1 : 1;  
                const dx = Math.abs(figure.x - king.x);    
                
                if(figure.y !== king.y){
                    if(this.cellHorizontalRookBlack){
                        return {cell: this.cellHorizontalRookBlack, bool: false}
                    }
                    return {cell: this.cellHorizontalRookBlack!, bool: false}
                }

                for (let i = 1; i <= dx; i++) {
                    if(!this.board.getCell(figure.y, figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y, figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellHorizontalRookBlack!, bool: false}
                        }
                        item = this.board.getCell(figure.y, figure.x + (i * directionX))
                        arrayCell.push(item)
                    }
                }
                
                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.y === king.y && this.deletedHorizontalRookBlack === arrayCell[2]){

                    this.cellHorizontalRookBlack = arrayCell[0]
                    this.deletedHorizontalRookBlack = null
                    this.counterHorizontalRookBlack = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedHorizontalRookBlack = null
                    this.counterHorizontalRookBlack = 0
                    return {cell: newA[0], bool: false}
                } 
            }


            blockFigureMovementDiagonalBishopBlack(figure: Cell, king: XY){
                this.counterDiagonalBishopBlack = this.counterDiagonalBishopBlack + 1
                if(this.counterDiagonalBishopBlack === 1){
                   this.deletedDiagonalBishopBlack = figure   
                }
                
                const dx = Math.abs(figure.x - king.x);
                const dy = Math.abs(figure.y - king.y);

                const directionX = king.x < figure.x ? -1 : 1;    
                const directionY = king.y < figure.y ? -1 : 1;
                
                let arrayFigures: Array<Cell> = [];

                    if(dx !== dy){
                        if(this.cellDiagonalBishopBlack){
                            return {cell: this.cellDiagonalBishopBlack, bool: false}
                        }
                        return {cell: this.cellDiagonalBishopBlack!, bool: false}
                    }

                for (let i = 1; i <= dy; i++) {                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellDiagonalBishopBlack!, bool: false}
                        }
                        arrayFigures.push(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)))                   
                    }
                }

                arrayFigures.push(figure)
                
                if(arrayFigures.length === 3 && dx === dy && this.deletedDiagonalBishopBlack === arrayFigures[2]){
                    this.cellDiagonalBishopBlack = arrayFigures[0]
                    this.deletedDiagonalBishopBlack = null
                    this.counterDiagonalBishopBlack = 0
                    return {cell: arrayFigures[0], bool: true}
                }
                else{
                    const newA = arrayFigures.filter(el => el.block === true)
                    this.deletedDiagonalBishopBlack = null
                    this.counterDiagonalBishopBlack = 0
                    return {cell: newA[0], bool: false}
                }
            }



            
        moveDiagonalKingDisabledWhite(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i <= dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING ){
                        return false
                    }
                }
            }
            return true;
        }

        moveHorizontalKingDisabledWhite(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
                        return false  
                    }
                }
            }
            return true
        }

        moveVerticalKingDisabledWhite(target: Cell){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
                        return false  
                    }
                }   
            }
            return true
        }

        moveDiagonalKingDisabledBlack(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i <= dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING){
                        return false
                    }
                }
            }
            return true;
        }

        moveHorizontalKingDisabledBlack(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
                        return false
                    }
                }
            }
            return true
        }

        moveVerticalKingDisabledBlack(target: Cell){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
                        return false  
                    }
                }   
            }
            return true
        }






        kingMovementWhiteDiagonal(cell: Cell){
            const dx = Math.abs(cell.x - this.x);
            const dy = Math.abs(cell.y - this.y);

            const directionX = this.x < cell.x ? 1 : -1
            const directionY = this.y < cell.y ? 1 : -1

            if(dx !== dy){
                return false
            }

            for (let i = 1; i <= dx; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.color === Color.BLACK
                    && this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING){
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementWhiteVertical(cell: Cell){
            if(this.x !== cell.x){
                return false
            }
            const max = Math.max(cell.y, this.y);
            const min = Math.min(cell.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.color === Color.BLACK
                    && this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementWhiteHorizontal(cell: Cell){
            if(this.y !== cell.y){
                return false
            }
            const max = Math.max(cell.x, this.x);
            const min = Math.min(cell.x, this.x);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.color === Color.BLACK
                    && this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
                        return true
                    }
                }
            }
            return false 
        }

        kingMovementBlackDiagonal(cell: Cell){
            const dx = Math.abs(cell.x - this.x);
            const dy = Math.abs(cell.y - this.y);

            const directionX = this.x < cell.x ? 1 : -1
            const directionY = this.y < cell.y ? 1 : -1

            if(dx !== dy){
                return false
            }

            for (let i = 1; i <= dx; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.color === Color.WHITE){
                        this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).available = false
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementBlackVertical(cell: Cell){
            if(this.x !== cell.x){
                return false
            }
            const max = Math.max(cell.y, this.y);
            const min = Math.min(cell.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.color === Color.WHITE){
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementBlackHorizontal(cell: Cell){
            if(this.y !== cell.y){
                return false
            }
            const max = Math.max(cell.x, this.x);
            const min = Math.min(cell.x, this.x);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.color === Color.WHITE){
                        this.board.getCell(this.y, i).available = false
                        return true
                    }
                }
            }
            return false 
        }



        isEmpty(){
            return this.figure === null;
        }

        moveDiagonal(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i < dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    return false;
                }
            }
            return true;
        }
        moveHorizontal(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    return false
                }
            }
            return true
        }
        moveVertical(target: Cell){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    return false
                }   
            }
            return true
        }





        blackKingKill(cell: Cell, kingParams: XY){
            if(cell.figure?.figureName === FigureName.QUEEN){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingDiagonal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true;
                }
            }
            if(cell.figure?.figureName === FigureName.BISHOP){
                if(this.tryToKillKingDiagonal(cell, kingParams)){
                    return true
                }
            }
            if (cell.figure?.figureName === FigureName.KNIGHT) {
                if(this.tryToKillKingWithKnight(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.PAWN){
                if(this.tryToKillKingWithPawn(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.ROOK){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true
                }
            }
        }
        
        whiteKingKill(cell: Cell, kingParams: XY){
            if(cell.figure?.figureName === FigureName.QUEEN){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingDiagonal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true;
                }
            }
            if(cell.figure?.figureName === FigureName.BISHOP){
                if(this.tryToKillKingDiagonal(cell, kingParams)){
                    return true
                }
            }
            if (cell.figure?.figureName === FigureName.KNIGHT) {
                if(this.tryToKillKingWithKnight(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.PAWN){
                if(this.tryToKillKingWithPawn(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.ROOK){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true
                }
            }
        }

        tryToKillKingDiagonal(cell: Cell, kingParams: XY){        
            const dx = Math.abs(cell.x - kingParams.x);
            const dy = Math.abs(cell.y - kingParams.y);

            const directionX = kingParams.x < cell.x ? -1 : 1;
            const directionY = kingParams.y < cell.y ? -1 : 1;
            
            if(dy !== dx){                
                return false
            }
            for (let i = 1; i <= dx; i++) {
                if(!this.board.getCell(cell.y + (i * directionY), cell.x + (i * directionX)).isEmpty()){
                    if (this.board.getCell(cell.y + (i * directionY), cell.x + (i * directionX)).figure?.figureName !== FigureName.KING) {
                        return false
                    }
                    else{         
                        return true
                    }
                }
            }
        }

        tryToKillKingHorizontal(cell: Cell, kingParams: XY){  
            if(cell.y !== kingParams.y){
                return false
            }    
            
            const max = Math.max(cell.x, kingParams.x);
            const min = Math.min(cell.x, kingParams.x);

            for (let i = min + 1; i < max; i++) {

                if(!this.board.getCell(cell.y, i).isEmpty()){
                    if (this.board.getCell(cell.y, i).figure?.figureName !== FigureName.KING) {
                        return false
                    }
                }
            }
            return true
        }

        tryToKillKingVertical(cell: Cell, kingParams: XY){  
            if(cell.x !== kingParams.x){
                return false
            }    
            
            const max = Math.max(cell.y, kingParams.y);
            const min = Math.min(cell.y, kingParams.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, cell.x).isEmpty()){
                    if (this.board.getCell(i, cell.x).figure?.figureName !== FigureName.KING) {
                        return false
                    }
                }
            }
            return true
        }

        tryToKillKingWithKnight(cell: Cell, kingParams: XY){ 
            const dx = Math.abs(cell.x - kingParams.x);
            const dy = Math.abs(cell.y - kingParams.y);
            if((dy === 2 && dx === 1) || (dy === 1 && dx === 2)){
                return true  
            }
            return false
        }

        tryToKillKingWithPawn(cell: Cell, kingParams: XY){
            const direction = cell.figure?.color === Color.BLACK ? 1 : -1;
            if(kingParams.y === cell.y + direction && cell.figure && (kingParams.x === cell.x + 1 || kingParams.x === cell.x - 1)){
                return true
            }
            return false
        }




        clearToCastling(clickedCell: Cell, currentCell: Cell){
            if(clickedCell.y !== currentCell.y){
                return false
            }
            const max = Math.max(clickedCell.x, currentCell.x);
            const min = Math.min(clickedCell.x, currentCell.x);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(clickedCell.y, i).isEmpty()){
                    return false
                }
            }
            return true
        }

        Castling(clicked: Cell, current: Cell, XY: XYCastling, color: Color){
            new Rook(color , this.board.getCell(clicked.y, XY.rookX), null);
            new King(color, this.board.getCell(current.y, XY.kingX), null);
            return true
        }
        clearCastling(clicked: Cell, current: Cell, color: Color){
            new Rook(color, this.board.getCell(clicked.y, clicked.x), null).cell.figure = null;
            new King(color, this.board.getCell(current.y, current.x), null).cell.figure = null;
        }

        biggerCastling(clicked: Cell, current: Cell, XY: XYCastling, color: Color) {
            new Rook(color, this.board.getCell(clicked.y, XY.rookX), null);
            new King(color, this.board.getCell(current.y, XY.kingX), null);
            return true
        }
        clearBiggerCastling(clicked: Cell, current: Cell, color: Color){
            new Rook(color, this.board.getCell(clicked.y, clicked.x), null).cell.figure = null;
            new King(color, this.board.getCell(current.y, current.x), null).cell.figure = null;
        }
    }