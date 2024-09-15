import { isnan } from "react-native-gesture-handler/lib/typescript/web_hammer/utils";
import whiteSquareSource from "../../assets/board/whitesquare.jpg";
import Rook from "../../pieces/Rook";
import blackSquareSource from "../../assets/board/blacksquare.jpg";
import Knight from "../../pieces/Knight";
import Bishop from "../../pieces/Bishop";
import Queen from "../../pieces/Queen";
import King from "../../pieces/King";
import Pawn from "../../pieces/Pawn";


const LETTERS = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h"
};

const buildPieceFromAlgNot = (char, letter, number) => {
  switch (char.toLowerCase()) {
  case "r": return new Rook(char === "r" ? "black" : "white", letter, number);
  case "n": return new Knight(char === "n" ? "black" : "white", letter, number);
  case "b": return new Bishop(char === "b" ? "black" : "white", letter, number);
  case "q": return new Queen(char === "q" ? "black" : "white", letter, number);
  case "k": return new King(char === "k" ? "black" : "white", letter, number);
  case "p": return new Pawn(char === "p" ? "black" : "white", letter, number);

  default: return null;
  }
};

const fenToJSON = (fen) => {
  let fenSplit = fen.split(" ");

  let fenBoard = fenSplit[0];
  fenBoard = fenBoard.split("/");

  let fenCastling = fenSplit[2];

  let loadedBoard = [...Array(8)].map(_=>Array(8).fill(null));
  const BOARD_LENGTH = 8;

  const PIECES = "RNBQKPrnbqkp";

  let isWhite = true;
  for (let row = 0; row < BOARD_LENGTH; row++) {
    let acc = 1;

    for (let j = 0; j < fenBoard[row].length; j++) {
      let char = fenBoard[row][j];

      if (isNaN(char + "") && PIECES.includes(char)) {
        let piece = buildPieceFromAlgNot(char, LETTERS[String(acc)], row);

        if (piece.name && piece.name === "rook") {
          if (piece.color === "black") {
            if (fenCastling.includes("k") && piece.letter === "h")
              piece.hasMoved = false;
            else if (fenCastling.includes("q") && piece.letter === "a")
              piece.hasMoved = false;
            else
              piece.hasMoved = true;
          } else {
            if (fenCastling.includes("K") && piece.letter === "h")
              piece.hasMoved = false;
            else if (fenCastling.includes("Q") && piece.letter === "a")
              piece.hasMoved = false;
            else
              piece.hasMoved = true;
          }
        } else if (piece.name && piece.name === "king") {
          if (fenCastling === "-")
            piece.hasMoved = true;
          else if (piece.color === "black")
            piece.hasMoved = !(fenCastling.includes("k") || fenCastling.includes("q"));
          else
            piece.hasMoved = !(fenCastling.includes("K") || fenCastling.includes("Q"));
        }

        loadedBoard[row][acc - 1] = {
          src: isWhite ? whiteSquareSource : blackSquareSource,
          letter: LETTERS[String(acc)],
          number: row,
          piece: piece
        };

        isWhite = !isWhite;
        acc++;
      }
      else {
        for (let i = 0; i < Number(char); i++) {
          loadedBoard[row][acc - 1] = {
            src: isWhite ? whiteSquareSource : blackSquareSource,
            letter: LETTERS[String(acc)],
            number: row,
            piece: null
          };

          isWhite = !isWhite;
          acc++;
        }
      }
    }

    isWhite = !isWhite;
  }

  console.log(loadedBoard);
  console.table(loadedBoard);
};

export default fenToJSON;