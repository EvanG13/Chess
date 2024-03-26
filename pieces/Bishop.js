import Piece from "./Piece.js";
const whiteBishopSource = require("../../assets/pieces/whitebishop.jpg");
const blackBishopSource = require("../../assets/pieces/blackbishop.jpg");

class Bishop extends Piece {

    constructor(color, letter, number) {
        super(color, color == black ? blackPawnSource : whitePawnSource, letter, number, "bishop");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Bishop;