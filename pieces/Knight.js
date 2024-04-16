import Piece from "./Piece.js";
const whiteKnightSource = require("../assets/gothicPieces/wn.png");
const blackKnightSource = require("../assets/gothicPieces/bn.png");

class Knight extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackKnightSource : whiteKnightSource;
    super(color, src, letter, number, "knight");
  }

  getValidMoves(board, kingSquare) {
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
      }
    }
    return validMoves;
  }

  getValidMoves(board, kingSquare) {
    const col = this.convertLetterToNumber(this.letter);
    const row = this.number;
    let validMoves = [];

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
        //moving piece to check for if king is in check
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
    return validMoves;
  }

  getAllMoves(board) {
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
