import Piece from "./Piece.js";
const whiteKingSource = require("../assets/gothicPieces/wk.png");
const blackKingSource = require("../assets/gothicPieces/bk.png");

class King extends Piece {
  constructor(color, letter, number) {
    const src = color === "black" ? blackKingSource : whiteKingSource;
    super(color, src, letter, number, "king");
  }

  isValidMove(destLetter, destNumber)   {console.log("Rook", destLetter, destNumber);}
}

export default King;
