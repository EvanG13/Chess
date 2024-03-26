
import Piece from "./Piece.js";
const whitePawnSource = require("../../assets/pieces/whitepawn.jpg");
const blackPawnSource = require("../../assets/pieces/blackpawn.jpg");

class Pawn extends Piece {

    constructor(color, letter, number) {
        super(color, color == black ? blackPawnSource : whitePawnSource, letter, number, "pawn");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Pawn;