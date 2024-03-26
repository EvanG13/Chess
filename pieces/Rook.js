import Piece from "./Piece.js";
const whiteRookSource = require("../../assets/pieces/whiterook.jpg");
const blackRookSource = require("../../assets/pieces/blackrook.jpg");

class Rook extends Piece {

    constructor(color, letter, number) {
        super(color, color == black ? blackRookSource : whiteRookSource, letter, number, "rook");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Rook;