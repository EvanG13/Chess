import Piece from "./Piece.js";
const whiteKnightSource =  "../assets/pieces1/wn.svg";
const blackKnightSource =  "../assets/pieces1/bn.svg";

class Knight extends Piece {

    constructor(color, letter, number) {
       const src = color === 'black' ? blackKnightSource : whiteKnightSource;
        super(color, src, letter, number, "knight");
        
    }

    isValidMove(destLetter, destNumber){

    }
}

export default Knight;