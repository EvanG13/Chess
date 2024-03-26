import Piece from "./Piece.js";
const whiteKingSource = "../assets/pieces1/wk.svg";
const blackKingSource = "../assets/pieces1/bk.svg";

class King extends Piece {

    constructor(color, letter, number) {
        const src = color === 'black' ? blackKingSource : whiteKingSource;
        super(color, src, letter, number, "king");
    }

    isValidMove(destLetter, destNumber){

    }
}

export default King;