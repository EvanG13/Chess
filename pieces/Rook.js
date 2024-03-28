import Piece from "./Piece.js";
const whiteRookSource = require("../assets/gothicPieces/wr.png");
const blackRookSource = require("../assets/gothicPieces/br.png");

class Rook extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackRookSource : whiteRookSource;
    super(color, src, letter, number, "pawn");
  }

  isValidMove(destLetter, destNumber) {}
}

export default Rook;
