import { getNumberFromLetter } from "../../components/Board/Board";

class Piece {
  constructor(color, src, letter, number, name) {
    this.color = color;
    this.src = src;
    this.letter = letter;
    this.number = number;
    this.name = name;
  }

  convertLetterToNumber(letter) {
    return getNumberFromLetter(letter);
  }

  move(destLetter, destNumber) {
    //1. update the board.board array
    //1a. make the piece at this.letter and this.number null
    //1b. make the piece at destLetter destNumber this piece
    //2. possibly need to rerender the board.board.jsx somehow...
    //3. possibly could animate this process???
    console.info("Rook", destLetter, destNumber);
  }

  isValidMove(row, col, validMoves) {
    return validMoves.some((move) => move[0] === row && move[1] === col);
  }

  isWhite() {
    return this.color === "white";
  }

  isBlack() {
    return this.color === "black";
  }
}

export default Piece;
