import Piece from "./Piece.js";
const whiteKnightSource = require("../assets/gothicPieces/wn.png");
const blackKnightSource = require("../assets/gothicPieces/bn.png");

class Knight extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackKnightSource : whiteKnightSource;
    super(color, src, letter, number, "knight");
  }

  getValidMoves(board) {
    const col = this.convertLetterToNumber(this.letter);
    const dirs = [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [-1, -2]
    ];
    let validMoves = [];
    let newRow;
    let newCol;
    for (let i = 0; i < dirs.length; i++) {
      newRow = this.number + dirs[i][0];
      newCol = col + dirs[i][1];

      if (newRow > 7 || newRow < 0 || newCol > 7 || newCol < 0) {
        continue;
      }

      if (
        board[newRow][newCol].piece === null ||
        board[newRow][newCol].piece.color != this.color
      ) {
        validMoves.push([newRow, newCol]);
      }
    }
    return validMoves;
  }
}

export default Knight;
