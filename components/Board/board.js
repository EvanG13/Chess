import Pawn from "../../pieces/Pawn";
import Rook from "../../pieces/Rook";
import Knight from "../../pieces/Knight";
import Bishop from "../../pieces/Bishop";
import Queen from "../../pieces/Queen";
import King from "../../pieces/King";

const blackSquareSource = require("../../assets/board/blacksquare.jpg");
const whiteSquareSource = require("../../assets/board/whitesquare.jpg");

export const LETTERS = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h"
};

//returns the column number of the letter
export const getNumberFromLetter = (letter) => {
  return (
    parseInt(Object.keys(LETTERS).find((key) => LETTERS[key] === letter)) - 1
  );
};

//each row has a number and each column has a letter

const getStartingBoard = () => {
  let startingBoard = [];
  startingBoard.push(new Array(8).fill(null));
  const BOARD_LENGTH = 8;

  startingBoard[0][0] = {
    src: whiteSquareSource,
    letter: "a",
    number: 1,
    piece: new Rook("black", "a", 1)
  };
  startingBoard[0][1] = {
    src: blackSquareSource,
    letter: "b",
    number: 1,
    piece: new Knight("black", "b", 1)
  };
  startingBoard[0][2] = {
    src: whiteSquareSource,
    letter: "c",
    number: 1,
    piece: new Bishop("black", "c", 1)
  };
  startingBoard[0][3] = {
    src: blackSquareSource,
    letter: "d",
    number: 1,
    piece: new Queen("black", "d", 1)
  };
  startingBoard[0][4] = {
    src: whiteSquareSource,
    letter: "e",
    number: 1,
    piece: new King("black", "e", 1)
  };
  startingBoard[0][5] = {
    src: blackSquareSource,
    letter: "f",
    number: 1,
    piece: new Bishop("black", "f", 1)
  };
  startingBoard[0][6] = {
    src: whiteSquareSource,
    letter: "g",
    number: 1,
    piece: new Knight("black", "g", 1)
  };
  startingBoard[0][7] = {
    src: blackSquareSource,
    letter: "h",
    number: 1,
    piece: new Rook("black", "h", 1)
  };

  // second rows (the black pawns)
  for (let i = 2; i < 3; i++) {
    let row = [];
    for (let j = 1; j <= BOARD_LENGTH; j++) {
      row.push({
        src: (i + j) % 2 === 0 ? whiteSquareSource : blackSquareSource,
        letter: LETTERS[j.toString()],
        number: i,
        piece: new Pawn("black", LETTERS[j.toString()], i)
      });
    }
    startingBoard.push(row);
  }

  // third row to sixth row
  for (let i = 3; i <= 6; i++) {
    let row = [];
    for (let j = 1; j <= BOARD_LENGTH; j++) {
      row.push({
        src: (i + j) % 2 === 0 ? whiteSquareSource : blackSquareSource,
        letter: LETTERS[j.toString()],
        number: i,
        piece: null
      });
    }
    startingBoard.push(row);
  }

  // seventh rows (the white pawns)
  for (let i = 7; i < 8; i++) {
    let row = [];
    for (let j = 1; j <= BOARD_LENGTH; j++) {
      row.push({
        src: (i + j) % 2 === 0 ? whiteSquareSource : blackSquareSource,
        letter: LETTERS[j.toString()],
        number: i,
        piece: new Pawn("white", LETTERS[j.toString()], i)
      });
    }
    startingBoard.push(row);
  }
  startingBoard.push(new Array(8).fill(null));
  // eighth row
  startingBoard[7][0] = {
    src: blackSquareSource,
    letter: "a",
    number: 8,
    piece: new Rook("white", "a", 8)
  };
  startingBoard[7][1] = {
    src: whiteSquareSource,
    letter: "b",
    number: 8,
    piece: new Knight("white", "b", 8)
  };
  startingBoard[7][2] = {
    src: blackSquareSource,
    letter: "c",
    number: 8,
    piece: new Bishop("white", "c", 8)
  };
  startingBoard[7][3] = {
    src: whiteSquareSource,
    letter: "d",
    number: 8,
    piece: new Queen("white", "d", 8)
  };
  startingBoard[7][4] = {
    src: blackSquareSource,
    letter: "e",
    number: 8,
    piece: new King("white", "e", 8)
  };
  startingBoard[7][5] = {
    src: whiteSquareSource,
    letter: "f",
    number: 8,
    piece: new Bishop("white", "f", 8)
  };
  startingBoard[7][6] = {
    src: blackSquareSource,
    letter: "g",
    number: 8,
    piece: new Knight("white", "g", 8)
  };
  startingBoard[7][7] = {
    src: whiteSquareSource,
    letter: "h",
    number: 8,
    piece: new Rook("white", "h", 8)
  };
  return startingBoard;
};

export default getStartingBoard;
