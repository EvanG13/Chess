import Piece from "./Piece.js";
const whiteKnightSource =  "../assets/pieces1/wn.svg";
const blackKnightSource =  "../assets/pieces1/bn.svg";

class Knight extends Piece {

    constructor(color, letter, number) {
       const src = color === 'black' ? blackKnightSource : whiteKnightSource;
        super(color, src, letter, number, "knight");
        
    }

    isValidMove(destLetter, destNumber){
        const letterDifference = Math.abs(destLetter.charCodeAt(0) - this.letter.charCodeAt(0));
        const numberDifference = Math.abs(destNumber - this.number);
        if((letterDifference === 2 && numberDifference === 1) || (letterDifference === 1 && numberDifference === 2)){
            return true;
        }
        return false;
    }
}

export default Knight;