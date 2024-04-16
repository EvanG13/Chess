import Piece from "./Piece.js";
const whiteKingSource = require("../assets/gothicPieces/wk.png");
const blackKingSource = require("../assets/gothicPieces/bk.png");
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";
import { LETTERS } from "../components/Board/board.js";

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
    //remove the king from the board as we are testing the state after the move
    board[this.number][col].piece = null;
    for (let i = 0; i < validMoves.length; i++) {
      let dummyKing = new King(
        this.color,
        LETTERS[validMoves[i][1] + 1],
        validMoves[i][0]
      );

      if (dummyKing.isCheck(board)) {
        validMoves.splice(i, 1);
        i--;
      }
    }
    //put the king back on the board. Is this necessary? is the board a copy or ref?
    board[this.number][col].piece = this;
    return validMoves;
  }

  isCheck(board) {
    const knight = new Knight(this.color, this.letter, this.number);
    const bishop = new Bishop(this.color, this.letter, this.number);
    const rook = new Rook(this.color, this.letter, this.number);
    let dummyPiece = null;
    //check for knights
    let validMoves = knight.getAllMoves(board);
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[validMoves[i][0]][validMoves[i][1]].piece;
      if (dummyPiece == null) continue;
      if (dummyPiece.name === "knight" && dummyPiece.color != this.color) {
        return true;
      }
    }
    //check for bishops or queens
    validMoves = bishop.getAllMoves(board);
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[validMoves[i][0]][validMoves[i][1]].piece;
      if (dummyPiece == null) continue;
      if (
        (dummyPiece.name === "bishop" || dummyPiece.name === "queen") &&
        dummyPiece.color != this.color
      ) {
        return true;
      }
    }
    //check for rooks or queens
    validMoves = rook.getAllMoves(board);
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[validMoves[i][0]][validMoves[i][1]].piece;
      if (dummyPiece == null) continue;
      if (
        (dummyPiece.name === "rook" || dummyPiece.name === "queen") &&
        dummyPiece.color != this.color
      ) {
        return true;
      }
    }
    //check for kings
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
    validMoves = [];
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
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[validMoves[i][0]][validMoves[i][1]].piece;
      if (dummyPiece == null) continue;
      if (dummyPiece.name === "king" && dummyPiece.color != this.color) {
        return true;
      }
    }

    //check for pawns
    let direction = this.color === "black" ? 1 : -1;
    let pawnSquares = [];
    if (
      this.number + direction >= 0 &&
      this.number + direction <= 7 &&
      this.convertLetterToNumber(this.letter) - 1 >= 0
    ) {
      pawnSquares.push([
        this.number + direction,
        this.convertLetterToNumber(this.letter) - 1
      ]);
    }
    if (
      this.number + direction >= 0 &&
      this.number + direction <= 7 &&
      this.convertLetterToNumber(this.letter) + 1 <= 7
    ) {
      pawnSquares.push([
        this.number + direction,
        this.convertLetterToNumber(this.letter) + 1
      ]);
    }
    for (let i = 0; i < pawnSquares.length; i++) {
      if (
        board[pawnSquares[i][0]][pawnSquares[i][1]].piece != null &&
        board[pawnSquares[i][0]][pawnSquares[i][1]].piece.name === "pawn" &&
        board[pawnSquares[i][0]][pawnSquares[i][1]].piece.color != this.color
      ) {
        return true;
      }
    }
    return false;
  }

  isCheckMate(board) {
    //check if king can move out of check
    let validMoves = this.getValidMoves(board);
    let dummyKing;
    for (let i = 0; i < validMoves.length; i++) {
      dummyKing = new King(this.color, validMoves[i][0], validMoves[i][1]);
      if (!dummyKing.isCheck(board)) {
        return false;
      }
    }

    //TODO: check if a piece can block the check (gonna be really annoying to implement)
    return true;
  }
}

export default King;
