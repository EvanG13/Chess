import Piece from "./Piece.js";

const whitePawnSource = require("../assets/gothicPieces/wp.png");
const blackPawnSource = require("../assets/gothicPieces/bp.png");

class Pawn extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackPawnSource : whitePawnSource;
    super(color, src, letter, number, "pawn");
  }

  getValidMoves(board, kingSquare) {
    const col = this.convertLetterToNumber(this.letter);
    const row = this.number;
    let validMoves = [];
    let direction = 1; //if player is black
    if (this.color === "white") {
      direction = -1;
    }
    const rightAbove =
      board[this.number + direction][this.convertLetterToNumber(this.letter)];
    if (rightAbove.piece === null) {
      //if the pawn is in starting position
      if (
        (this.number === 1 || this.number == 6) &&
        board[this.number + direction * 2][
          this.convertLetterToNumber(this.letter)
        ].piece === null
      ) {
        //moving piece to check for if king is in check
        board[row + direction * 2][col].piece = board[row][col].piece;
        board[row][col].piece = null;
        if (!board[kingSquare[0]][kingSquare[1]].piece.isCheck(board)) {
          validMoves.push([
            this.number + direction * 2,
            this.convertLetterToNumber(this.letter)
          ]);
        }
        //moving piece back after checking if king is in check
        board[row][col].piece = board[row + direction * 2][col].piece;
        board[row + direction * 2][col].piece = null;
      }

      if (this.number + direction >= 0 || this.number + direction <= 7) {
        board[row + direction][col].piece = board[row][col].piece;
        board[row][col].piece = null;
        if (!board[kingSquare[0]][kingSquare[1]].piece.isCheck(board)) {
          validMoves.push([
            row + direction,
            this.convertLetterToNumber(this.letter)
          ]);
        }
        //moving piece back after checking if king is in check
        board[row][col].piece = board[row + direction][col].piece;
        board[row + direction][col].piece = null;
      }
    }
    //handle diagonal attacks
    if (this.convertLetterToNumber(this.letter) < 7) {
      const upRight =
        board[this.number + direction][
          this.convertLetterToNumber(this.letter) + 1
        ];
      if (upRight.piece !== null && upRight.piece.color !== this.color) {
        let tempPiece = board[row + direction][col + 1].piece;
        board[row + direction][col + 1].piece = board[row][col].piece;
        board[row][col].piece = null;
        if (!board[kingSquare[0]][kingSquare[1]].piece.isCheck(board)) {
          validMoves.push([row + direction, col + 1]);
        }
        //moving piece back after checking if king is in check
        board[row][col].piece = board[row + direction][col + 1].piece;
        board[row + direction][col + 1].piece = tempPiece;
      }
    }
    if (this.convertLetterToNumber(this.letter) > 0) {
      const upLeft =
        board[this.number + direction][
          this.convertLetterToNumber(this.letter) - 1
        ];
      if (upLeft.piece !== null && upLeft.piece.color !== this.color) {
        let tempPiece = board[row + direction][col - 1].piece;
        board[row + direction][col - 1].piece = board[row][col].piece;
        board[row][col].piece = null;
        if (!board[kingSquare[0]][kingSquare[1]].piece.isCheck(board)) {
          validMoves.push([row + direction, col - 1]);
        }
        //moving piece back after checking if king is in check
        board[row][col].piece = board[row + direction][col - 1].piece;
        board[row + direction][col - 1].piece = tempPiece;
      }
    }
    return validMoves;
  }
}

export default Pawn;
