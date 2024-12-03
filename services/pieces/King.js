import Piece from "./Piece.js";
const whiteKingSource = require("../../assets/gothicPieces/wk.png");
const blackKingSource = require("../../assets/gothicPieces/bk.png");
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";
import { LETTERS } from "../../components/Board/board.js";

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
        board.board[newRow][newCol].piece === null ||
        board.board[newRow][newCol].piece.color != this.color
      ) {
        validMoves.push([newRow, newCol]);
      }
    }
    //remove the king from the board.board as we are testing the state after the move
    board.board[this.number][col].piece = null;
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
    //put the king back on the board.board. Is this necessary? is the board.board a copy or ref?
    board.board[this.number][col].piece = this;

    //check for castling
    if (this.canCastleQueenside(board)) {
      validMoves.push([this.number, col - 2]);
    }
    if (this.canCastleKingside(board)) {
      validMoves.push([this.number, col + 2]);
    }
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
      dummyPiece = board.board[validMoves[i][0]][validMoves[i][1]].piece;
      if (dummyPiece == null) continue;
      if (dummyPiece.name === "knight" && dummyPiece.color != this.color) {
        return true;
      }
    }
    //check for bishops or queens
    validMoves = bishop.getAllMoves(board);
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board.board[validMoves[i][0]][validMoves[i][1]].piece;
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
      dummyPiece = board.board[validMoves[i][0]][validMoves[i][1]].piece;
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
        board.board[newRow][newCol].piece === null ||
        board.board[newRow][newCol].piece.color != this.color
      ) {
        validMoves.push([newRow, newCol]);
      }
    }
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board.board[validMoves[i][0]][validMoves[i][1]].piece;
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
        board.board[pawnSquares[i][0]][pawnSquares[i][1]].piece != null &&
        board.board[pawnSquares[i][0]][pawnSquares[i][1]].piece.name ===
          "pawn" &&
        board.board[pawnSquares[i][0]][pawnSquares[i][1]].piece.color !=
          this.color
      ) {
        return true;
      }
    }
    return false;
  }

  isCheckmate(board) {
    //check if king can move out of check
    if (!this.isCheck(board)) return false;
    let validMoves = this.getValidMoves(board);
    if (validMoves.length > 0) return false;
    //check if any other piece can block the check
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          board.board[row][col].piece == null ||
          board.board[row][col].piece.color != this.color
        )
          continue;
        validMoves = board.board[row][col].piece.getValidMoves(board, [
          this.number,
          this.convertLetterToNumber(this.letter)
        ]);
        if (validMoves.length > 0) return false;
      }
    }
    return true;
  }
  canCastleQueenside(board) {
    //if king has moved cannot castle
    if (this.hasMoved) {
      return false;
    }
    let kingCol = this.convertLetterToNumber(this.letter);
    let homeRank = this.color === "white" ? 7 : 0;
    //get the queenside rook
    let rook = board.board[homeRank][0].piece;
    if (rook == null) {
      return false;
    }
    if (rook.name !== "rook" || rook.hasMoved) {
      return false;
    }

    const betweenSquares = [
      [homeRank, kingCol - 1],
      [homeRank, kingCol - 2],
      [homeRank, kingCol - 3]
    ];
    for (const square of betweenSquares) {
      if (board.board[square[0]][square[1]].piece != null) {
        return false;
      }
    }
    if (this.isCheck(board)) {
      return false;
    }

    //remove the square that the king does not go through
    betweenSquares.splice(2, 1);
    //check if the squares the king will move through are in check
    for (const square of betweenSquares) {
      let dummyKing = new King(this.color, LETTERS[square[1] + 1], square[0]);
      if (dummyKing.isCheck(board)) {
        return false;
      }
    }
    return true;
  }

  canCastleKingside(board) {
    //if king has moved cannot castle
    if (this.hasMoved) {
      return false;
    }
    let kingCol = this.convertLetterToNumber(this.letter);
    let homeRank = this.color === "white" ? 7 : 0;
    //get the queenside rook
    let rook = board.board[homeRank][7].piece;
    if (rook == null) {
      return false;
    }
    if (rook.name !== "rook" || rook.hasMoved) {
      return false;
    }

    const betweenSquares = [
      [homeRank, kingCol + 1],
      [homeRank, kingCol + 2]
    ];
    for (const square of betweenSquares) {
      if (board.board[square[0]][square[1]].piece != null) {
        return false;
      }
    }
    if (this.isCheck(board)) {
      return false;
    }

    //check if the squares the king will move through are in check
    for (const square of betweenSquares) {
      let dummyKing = new King(this.color, LETTERS[square[1] + 1], square[0]);
      if (dummyKing.isCheck(board)) {
        return false;
      }
    }
    return true;
  }
}

export default King;
