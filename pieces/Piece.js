
abstract class Piece {
  constructor(color, src, letter, number, name) {
    this.color = color;
    this.src = src;
    this.letter = letter;
    this.number = number;
    this.name = name;
  }

  abstract isValidMove(destLetter, destNumber);

  move(destLetter, destNumber){


  //1. update the board array
  //1a. make the piece at this.letter and this.number null
  //1b. make the piece at destLetter destNumber this piece
  //2. possibly need to rerender the board.jsx somehow...
  //3. possibly could animate this process???
  }
}

export default Piece;


