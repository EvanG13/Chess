import Piece from "./Piece.js";
const whitePawnSource = require("../assets/gothicPieces/wp.png");
const blackPawnSource = require("../assets/gothicPieces/bp.png");

class Pawn extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackPawnSource : whitePawnSource;
    super(color, src, letter, number, "pawn");
  }

  isValidMove(destLetter, destNumber)   {console.log("Rook", destLetter, destNumber);}
}

export default Pawn;
