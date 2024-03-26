
import Piece from "./Piece.js";
const whiteRookSource =  "../assets/pieces1/wr.svg";
const blackRookSource =  "../assets/pieces1/br.svg";

class Rook extends Piece {

    constructor(color, letter, number) {
       const src = color === 'black' ? blackRookSource : whiteRookSource;
        super(color, src, letter, number, "pawn");
        
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Rook;