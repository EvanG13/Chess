import Piece from "./Piece.js";
const whiteBishopSource = require("../assets/gothicPieces/wb.png");
const blackBishopSource = require("../assets/gothicPieces/bb.png");

class Bishop extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackBishopSource : whiteBishopSource;
    super(color, src, letter, number, "bishop");
  }

  isValidMove(destLetter, destNumber) {
    console.info("Rook", destLetter, destNumber);
  }
}

export default Bishop;
