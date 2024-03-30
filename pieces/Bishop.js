import Piece from "./Piece.js";
const whiteBishopSource = require("../assets/gothicPieces/wb.png");
const blackBishopSource = require("../assets/gothicPieces/bb.png");

class Bishop extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackBishopSource : whiteBishopSource;
    super(color, src, letter, number, "bishop");
  }

  getValidMoves(board){
      const col = this.convertLetterToNumber(this.letter);
      let validMoves = [];
      const dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
      let newRow;
      let newCol;

      for(let i=0; i<dirs.length; i++){
        newRow = this.number+dirs[i][0];
        newCol = col+dirs[i][1];

        while(newRow<=7 && newRow>=0 && newCol<=7 && newCol>=0 && board[newRow][newCol].piece === null){
            validMoves.push([newRow, newCol]);
            newRow += dirs[i][0];
            newCol += dirs[i][1];
        }

        if(newRow<=7 && newRow>=0 && newCol<=7 && newCol>=0){
            if(board[newRow][newCol].piece.color !== this.color){
                validMoves.push([newRow, newCol]);
            }
        }
      }
      return validMoves;
  }

  isValidMove(destLetter, destNumber) {
    console.info("Rook", destLetter, destNumber);
  }
}

export default Bishop;
