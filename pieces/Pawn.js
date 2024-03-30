import Piece from "./Piece.js";

const whitePawnSource = require("../assets/gothicPieces/wp.png");
const blackPawnSource = require("../assets/gothicPieces/bp.png");

class Pawn extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackPawnSource : whitePawnSource;
    super(color, src, letter, number, "pawn");
  }

  getValidMoves(board) {
    //console.log(this.number, this.letter);
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
        validMoves.push([
          this.number + direction * 2,
          this.convertLetterToNumber(this.letter)
        ]);
      }

      if (this.number + direction >= 0 || this.number + direction <= 7) {
        validMoves.push([
          this.number + direction,
          this.convertLetterToNumber(this.letter)
        ]);
      }
    }
    //handle diagonal attacks
    if (this.convertLetterToNumber(this.letter) < 7) {
      const upRight =
        board[this.number + direction][
          this.convertLetterToNumber(this.letter) + 1
        ];
      if (upRight.piece !== null && upRight.piece.color !== this.color) {
        validMoves.push([
          this.number + direction,
          this.convertLetterToNumber(this.letter) + 1
        ]);
      }
    }
    if (this.convertLetterToNumber(this.letter) > 0) {
      const upLeft =
        board[this.number + direction][
          this.convertLetterToNumber(this.letter) - 1
        ];
      if (upLeft.piece !== null && upLeft.piece.color !== this.color) {
        validMoves.push([
          this.number + direction,
          this.convertLetterToNumber(this.letter) - 1
        ]);
      }
    }
    return validMoves;
  }

  isValidMove(destLetter, destNumber) {
    console.info("Rook", destLetter, destNumber);
  }
}

export default Pawn;
