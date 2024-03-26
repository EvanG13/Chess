import Piece from "./Piece.js";
const whiteKingSource = require("../../assets/pieces/whiteking.jpg");
const blackKingSource = require("../../assets/pieces/blackking.jpg");

class King extends Piece {

    constructor(color, letter, number) {
        super(color, color == black ? blackKingSource : whiteKingSource, letter, number, "king");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default King;