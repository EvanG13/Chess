import Piece from "./Piece.js";
const whiteRookSource = require("../assets/gothicPieces/wr.png");
const blackRookSource = require("../assets/gothicPieces/br.png");

class Rook extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackRookSource : whiteRookSource;
    super(color, src, letter, number, "rook");
  }

  getValidMoves(board, kingSquare) {
    const col = this.convertLetterToNumber(this.letter);
    const row = this.number;
    let validMoves = [];

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    let newRow;
    let newCol;

    for (let i = 0; i < dirs.length; i++) {
      newRow = this.number + dirs[i][0];
      newCol = col + dirs[i][1];

      while (
        newRow <= 7 &&
        newRow >= 0 &&
        newCol <= 7 &&
        newCol >= 0 &&
        board[newRow][newCol].piece === null
      ) {
        //moving piece to check for if king is in check
        board[newRow][newCol].piece = board[row][col].piece;
        board[row][col].piece = null;
        //isValid move if it does not place our king in check :)
        if (!board[kingSquare[0]][kingSquare[1]].piece.isCheck(board)) {
          validMoves.push([newRow, newCol]);
        }
        //moving piece back after checking if king is in check
        board[row][col].piece = board[newRow][newCol].piece;
        board[newRow][newCol].piece = null;

        newRow += dirs[i][0];
        newCol += dirs[i][1];
      }

      if (newRow <= 7 && newRow >= 0 && newCol <= 7 && newCol >= 0) {
        if (board[newRow][newCol].piece.color !== this.color) {
          //moving piece to check if king is in check
          tempPiece = board[newRow][newCol].piece;
          board[newRow][newCol].piece = board[row][col].piece;
          board[row][col].piece = null;
          //isValid move if it does not place our king in check :)
          if (!board[kingSquare[0]][kingSquare[1]].piece.isCheck(board)) {
            validMoves.push([newRow, newCol]);
          }
          //moving piece back after checking if king is in check
          board[row][col].piece = board[newRow][newCol].piece;
          board[newRow][newCol].piece = tempPiece;
        }
      }
    }
    return validMoves;
  }

  getAllMoves(board) {
    const col = this.convertLetterToNumber(this.letter);
    const row = this.number;
    let validMoves = [];

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ];
    let newRow;
    let newCol;

    for (let i = 0; i < dirs.length; i++) {
      newRow = this.number + dirs[i][0];
      newCol = col + dirs[i][1];

      while (
        newRow <= 7 &&
        newRow >= 0 &&
        newCol <= 7 &&
        newCol >= 0 &&
        board[newRow][newCol].piece === null
      ) {
        validMoves.push([newRow, newCol]);

        newRow += dirs[i][0];
        newCol += dirs[i][1];
      }

      if (newRow <= 7 && newRow >= 0 && newCol <= 7 && newCol >= 0) {
        if (board[newRow][newCol].piece.color !== this.color) {
          validMoves.push([newRow, newCol]);
        }
      }
    }
    return validMoves;
  }
}

export default Rook;
