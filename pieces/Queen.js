import Piece from "./Piece.js";
const whiteQueenSource = require("../assets/gothicPieces/wq.png");
const blackQueenSource = require("../assets/gothicPieces/bq.png");

class Queen extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackQueenSource : whiteQueenSource;
    super(color, src, letter, number, "queen");
  }

  isValidMove(destLetter, destNumber) {
    console.info("Rook", destLetter, destNumber);
  }

  getValidMoves(board){
          const col = this.convertLetterToNumber(this.letter);
          let validMoves = [];
          const dirs = [[1,0],[-1,0],[0,1],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]];
          let newRow;
          let newCol;

          for(let i=0; i<dirs.length; i++){
            newRow = this.number+dirs[i][0];
            newCol = col+dirs[i][1];

            while(newRow<=7 && newRow>=0 && newCol<=7 && newCol>=0 && board[newRow][newCol].piece === null){
                console.log(newRow + " " + newCol);
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
          console.log(validMoves);
          return validMoves;
  }
}

export default Queen;
