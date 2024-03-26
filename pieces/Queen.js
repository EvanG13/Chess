import Piece from "./Piece.js";
const whiteQueenSource = require("../../assets/pieces/whitequeen.jpg");
const blackQueenSource = require("../../assets/pieces/blackqueen.jpg");

class Knight extends Piece {

    constructor(color, letter, number) {
        super(color, color == black ? blackQueenSource : whiteQueenSource, letter, number, "queen");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Queen;