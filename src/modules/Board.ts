import { Cell } from "./Cell"
import { Color } from "./Color";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Figure, FigureName } from "./figures/Figure";

interface XY{
    x: number
    y: number
}

interface FigureBlock {
    figure: Figure
    king: XY
}

export class Board {
    public cells: Cell[][] = [] 
    public deletedWhiteFigures: Figure[] = []
    public deletedBlackFigures: Figure[] = []

    public arrayWhiteForChange: Array<Figure> = []
    public arrayBlackForChange: Array<Figure> = []

    public arrayBlackFiguresKingMovement: Array<Figure> = []
    public arrayWhiteFiguresKingMovement: Array<Figure> = []

    public arrayBlackFiguresBlock: Array<FigureBlock> = []
    public arrayWhiteFiguresBlock: Array<FigureBlock> = []
    
    public initCells(){
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0){
                    row.push(new Cell(this, j , i, Color.BLACK, null))
                }
                else{
                    row.push(new Cell(this, j , i, Color.WHITE, null))
                }
            }
            this.cells.push(row)
        }
    }

    doRefreshFigures(targetClicked: Cell | null){
        for (let i = 0; i < this.cells.length; i++) {
            const row:Cell[] = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                    cell.available = !!targetClicked?.figure?.canMove(cell)   
            }
        }
    }

    doRefreshFiguresCanBlok(target: Cell | null){
        for (let i = 0; i < this.cells.length; i++) {
            const row:Cell[] = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                target?.figure?.canBlock(cell) 
            }
        }
    }

    createNewInstance(){
        const newBoard = new Board();
        newBoard.cells = this.cells
        newBoard.deletedWhiteFigures = this.deletedWhiteFigures
        newBoard.deletedBlackFigures = this.deletedBlackFigures
        newBoard.arrayWhiteForChange = this.arrayWhiteForChange
        newBoard.arrayBlackForChange = this.arrayBlackForChange
        newBoard.arrayBlackFiguresKingMovement = this.arrayBlackFiguresKingMovement 
        newBoard.arrayWhiteFiguresKingMovement = this.arrayWhiteFiguresKingMovement 
        newBoard.arrayBlackFiguresBlock = this.arrayBlackFiguresBlock
        newBoard.arrayWhiteFiguresBlock = this.arrayWhiteFiguresBlock
        return newBoard;
    }

    getCell(y: number, x: number){
        return this.cells[x][y];
    }
    setPawns(){
        for (let i = 0; i < 8; i++) {
            new Pawn(Color.WHITE, this.getCell(6, i), i)
            new Pawn(Color.BLACK, this.getCell(1, i), i)
        }
    }
    setQueen(){
        new Queen(Color.WHITE, this.getCell(7, 4), null)
        new Queen(Color.BLACK, this.getCell(0, 4), null)

        this.arrayWhiteForChange.push(new Queen(Color.WHITE, this.getCell(7, 4), null))
        this.arrayBlackForChange.push(new Queen(Color.BLACK, this.getCell(0, 4), null))
    }
    setKing(){
        new King(Color.WHITE, this.getCell(7, 3), null)
        new King(Color.BLACK, this.getCell(0, 3), null)
    }
    setBishop(){
        new Bishop(Color.WHITE, this.getCell(7, 2), 9999)
        new Bishop(Color.WHITE, this.getCell(7, 5), 1000)

        new Bishop(Color.BLACK, this.getCell(0, 2), 1100)
        new Bishop(Color.BLACK, this.getCell(0, 5), 1200)

        this.arrayWhiteForChange.push(new Bishop(Color.WHITE, this.getCell(7, 2), 9999))
        this.arrayBlackForChange.push(new Bishop(Color.BLACK, this.getCell(0, 2), 1100))
    }
    setKnight(){
        new Knight(Color.WHITE, this.getCell(7, 1), 1111)
        new Knight(Color.WHITE, this.getCell(7, 6), 2222)

        new Knight(Color.BLACK, this.getCell(0, 1), 3333)
        new Knight(Color.BLACK, this.getCell(0, 6), 4444)

        this.arrayWhiteForChange.push(new Knight(Color.WHITE, this.getCell(7, 1), 1111))
        this.arrayBlackForChange.push(new Knight(Color.BLACK, this.getCell(0, 1), 3333))
    }
    setRook(){
        new Rook(Color.WHITE, this.getCell(7, 0), 5555)
        new Rook(Color.WHITE, this.getCell(7, 7), 6666)

        new Rook(Color.BLACK, this.getCell(0, 0), 7777)
        new Rook(Color.BLACK, this.getCell(0, 7), 8888)

        this.arrayWhiteForChange.push(new Rook(Color.WHITE, this.getCell(7, 7), 5555))
        this.arrayBlackForChange.push(new Rook(Color.BLACK, this.getCell(0, 0), 7777))
    }
    initFigures(){
        this.setPawns()
        this.setQueen()
        this.setKing()
        this.setBishop()
        this.setKnight()
        this.setRook()
    }
}