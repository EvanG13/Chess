
import Piece from "./Piece.js";
const whitePawnSource =  "../assets/pieces1/wp.svg";
const blackPawnSource =  "../assets/pieces1/bp.svg";

class Pawn extends Piece {

    constructor(color, letter, number) {
       const src = color === 'black' ? blackPawnSource : whitePawnSource;
        super(color, src, letter, number, "pawn");
        
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Pawn;