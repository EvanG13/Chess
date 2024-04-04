import Piece from "./Piece.js";
const whiteKingSource = require("../assets/gothicPieces/wk.png");
const blackKingSource = require("../assets/gothicPieces/bk.png");
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";


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

  isCheck(board) {
    const knight = new Knight(this.color, this.letter, this.number);
    const bishop = new Bishop(this.color, this.letter, this.number);
    const rook = new Rook(this.color, this.letter, this.number);
    //check for knights
    let validMoves = knight.getValidMoves(board);
    let dummyPiece;
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[(validMoves[i][0], validMoves[i][1])].piece;
      if (dummyPiece == null) continue;
      if (dummyPiece.type === "knight" && dummyPiece.color != this.color) {
        return true;
      }
    }
    //check for bishops or queens
    validMoves = bishop.getValidMoves(board);
    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[(validMoves[i][0], validMoves[i][1])].piece;
      if (dummyPiece == null) continue;
      if (
        (dummyPiece.type === "bishop" || dummyPiece.type === "queen") &&
        dummyPiece.color != this.color
      ) {
        return true;
      }
    }
    //check for rooks or queens
    validMoves = rook.getValidMoves(board);

    for (let i = 0; i < validMoves.length; i++) {
      dummyPiece = board[(validMoves[i][0], validMoves[i][1])].piece;
      if (dummyPiece == null) continue;
      if (
        (dummyPiece.type === "rook" || dummyPiece.type === "queen") &&
        dummyPiece.color != this.color
      ) {
        return true;
      }
    }

    //check for pawns
    let direction = this.color === "black" ? -1 : 1;
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
        board[(pawnSquares[i][0], pawnSquares[i][1])].piece != null &&
        board[(pawnSquares[i][0], pawnSquares[i][1])].piece.type === "pawn" &&
        board[(pawnSquares[i][0], pawnSquares[i][1])].piece.color != this.color
      ) {
        return true;
      }
    }
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
