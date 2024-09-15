import { isnan } from "react-native-gesture-handler/lib/typescript/web_hammer/utils";
import whiteSquareSource from "../../assets/board/whitesquare.jpg";
import Rook from "../../pieces/Rook";
import blackSquareSource from "../../assets/board/blacksquare.jpg";
import Knight from "../../pieces/Knight";
import Bishop from "../../pieces/Bishop";
import Queen from "../../pieces/Queen";
import King from "../../pieces/King";
import Pawn from "../../pieces/Pawn";


const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BOARD_SIZE = 8;


const buildPiece = (char, letter, number) => {
  const PIECES = { r: Rook, n: Knight, b: Bishop, q: Queen, k: King, p: Pawn };
  let pieceClass = PIECES[char.toLowerCase()];

  if (!pieceClass) return null;

  let color = (char === char.toUpperCase() ? "white" : "black");
  return !pieceClass ? null : new pieceClass(color, letter, number);
};

const updateRookOrKingMovedStatus = (piece, letter, fenCastling) => {
  if (piece.name === "rook") {
    let castling = (piece.color === "black" ? ["k", "q"] : ["K", "Q"]);
    piece.hasMoved = !((fenCastling.includes(castling[0]) && letter === "h") || (fenCastling.includes(castling[1]) && letter === "a"));
  }
  else if (piece.name === "king") {
    let castling = (piece.color === "black" ? ["k", "q"] : ["K", "Q"]);
    piece.hasMoved = fenCastling === "-" || !(fenCastling.includes(castling[0]) || fenCastling.includes(castling[1]));
  }
};

const fenToJSON = (fen) => {
  let fenSplit = fen.split(" ");

  let fenBoard = fenSplit[0];
  fenBoard = fenBoard.split("/");

  let fenCastling = fenSplit[2];

  let loadedBoard = [...Array(BOARD_SIZE)].map(_=>Array(BOARD_SIZE).fill(null));

  let isWhiteSquare = true;
  for (let row = 0; row < BOARD_SIZE; row++) {
    let fenRow = fenBoard[row];

    let col = 0;

    for (let j = 0; j < fenBoard[row].length; j++) {
      let fenChar = fenRow[j];

      if (isNaN(fenChar)) {
        let colLetter = LETTERS[col];

        let piece = buildPiece(fenChar, colLetter, row);
        updateRookOrKingMovedStatus(piece, colLetter, fenCastling);

        loadedBoard[row][col] = {
          src: isWhiteSquare ? whiteSquareSource : blackSquareSource,
          letter: colLetter,
          number: row,
          piece: piece
        };

        isWhiteSquare = !isWhiteSquare;
        col++;
      }
      else {
        for (let i = 0; i < Number(fenChar); i++) {
          loadedBoard[row][col] = {
            src: isWhiteSquare ? whiteSquareSource : blackSquareSource,
            letter: LETTERS[col],
            number: row,
            piece: null
          };

          isWhiteSquare = !isWhiteSquare;
          col++;
        }
      }
    }

    isWhiteSquare = !isWhiteSquare;
  }

  console.log(loadedBoard);
  console.table(loadedBoard);
};

export default fenToJSON;