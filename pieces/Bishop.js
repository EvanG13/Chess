
import Piece from "./Piece.js";
const whiteBishopSource =  "../assets/pieces1/wb.svg";
const blackBishopSource =  "../assets/pieces1/bb.svg";

class Bishop extends Piece {

    constructor(color, letter, number) {
       const src = color === 'black' ? blackBishopSource : whiteBishopSource;
        super(color, src, letter, number, "bishop");
        
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Bishop;