
import Piece from "./Piece.js";
const whiteQueenSource =  "../assets/pieces1/wq.svg";
const blackQueenSource =  "../assets/pieces1/bq.svg";

class Queen extends Piece {

    constructor(color, letter, number) {
       const src = color === 'black' ? blackQueenSource : whiteQueenSource;
        super(color, src, letter, number, "queen");
        
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Queen;