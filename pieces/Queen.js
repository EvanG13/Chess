import Piece from "./Piece.js";
const whiteQueenSource = require("../assets/gothicPieces/wq.png");
const blackQueenSource = require("../assets/gothicPieces/bq.png");

class Queen extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackQueenSource : whiteQueenSource;
    super(color, src, letter, number, "queen");
  }

  isValidMove(destLetter, destNumber) {}
}

export default Queen;
