import Piece from "./Piece.js";
const whiteKnightSource = require("../../assets/pieces/whiteknight.jpg");
const blackKnightSource = require("../../assets/pieces/blackknight.jpg");

class Knight extends Piece {

    constructor(color, letter, number) {
        super(color, color == black ? blackKnightSource : whiteKnightSource, letter, number, "knight");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Knight;