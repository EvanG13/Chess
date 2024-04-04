import Piece from "./Piece.js";
const whiteKingSource = require("../assets/gothicPieces/wk.png");
const blackKingSource = require("../assets/gothicPieces/bk.png");

class King extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackKingSource : whiteKingSource;
    super(color, src, letter, number, "king");
    this.hasMoved = false;
  }

  //TODO: check for isCheck
  getValidMoves(board) {
    const directions = [
      [1, 0],
      [1, 1],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
      [0, 1],
      [0, -1]
    ];
    const col = this.convertLetterToNumber(this.letter);
    let validMoves = [];
    let newRow;
    let newCol;

    for (let i = 0; i < directions.length; i++) {
      newRow = this.number + directions[i][0];
      newCol = col + directions[i][1];

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

export default King;
