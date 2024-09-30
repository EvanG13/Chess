import whiteSquareSource from "../../assets/board/whitesquare.jpg";
import Rook from "../../pieces/Rook";
import blackSquareSource from "../../assets/board/blacksquare.jpg";
import Knight from "../../pieces/Knight";
import Bishop from "../../pieces/Bishop";
import Queen from "../../pieces/Queen";
import King from "../../pieces/King";
import Pawn from "../../pieces/Pawn";

const FEN_Util = {
  getBoard: (FEN) => FEN.split(" ")[0],
  getActiveColorChar: (FEN) => FEN.split(" ")[1],
  getCastlingFlags: (FEN) => FEN.split(" ")[2],
  getEnPassantFlag: (FEN) => FEN.split(" ")[3],
  getHalfmoveClock: (FEN) => FEN.split(" ")[4],
  getFullturns: (FEN) => FEN.split(" ")[5],
  getBoardRows: (FEN) => FEN_Util.getBoard(FEN).split("/"),
  getActiveColor: (FEN) =>
    FEN_Util.getActiveColorChar(FEN) === "w" ? "white" : "black",
  getCharPieceClass: (fenChar) => {
    const CLASSES = {
      r: Rook,
      n: Knight,
      b: Bishop,
      q: Queen,
      k: King,
      p: Pawn
    };
    return CLASSES[fenChar.toLowerCase()] || null;
  },
  getCharColor: (fenChar) =>
    fenChar === fenChar.toLowerCase() ? "black" : "white"
};

const buildSquare = (backgroundAsset, file, reverseRank, piece) => {
  return { src: backgroundAsset, letter: file, number: reverseRank, piece };
};

const buildPiece = (fenChar, file, reverseRank) => {
  let pieceClass = FEN_Util.getCharPieceClass(fenChar);
  return pieceClass
    ? new pieceClass(FEN_Util.getCharColor(fenChar), file, reverseRank)
    : null;
};

const updateRookOrKingMovedStatus = (piece, fenCastling) => {
  let rank = piece.letter;
  let castling = piece.isWhite() ? "KQ" : "kq";

  switch (piece.name) {
  case "rook":
    piece.hasMoved =
        !(rank === "h" && fenCastling.includes(castling[0])) &&
        !(rank === "a" && fenCastling.includes(castling[1]));
    break;
  case "king":
    piece.hasMoved =
        fenCastling === "-" ||
        !(
          fenCastling.includes(castling[0]) || fenCastling.includes(castling[1])
        );
    break;
  }
};

const fenToJSON = (FEN) => {
  let fenRows = FEN_Util.getBoardRows(FEN);
  let fenCastling = FEN_Util.getCastlingFlags(FEN);

  const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const BOARD_SIZE = 8;

  let loadedBoard = [];

  // the other board generator has [8th rank] as [row 0], so 'r'
  for (let r = 0; r < BOARD_SIZE; r++) {
    let boardRow = [];

    let file = 0;
    for (const fenChar of fenRows[r]) {
      if (isNaN(fenChar)) {
        let background =
          (r + file) % 2 === 0 ? whiteSquareSource : blackSquareSource;
        let fileLetter = LETTERS[file];

        let piece = buildPiece(fenChar, fileLetter, r);
        if (piece.name === "rook" || piece.name === "king")
          updateRookOrKingMovedStatus(piece, fenCastling);

        boardRow.push(buildSquare(background, fileLetter, r, piece));
        file++;
      } else {
        for (let fc = 0; fc < Number(fenChar); fc++) {
          let background =
            (r + file) % 2 === 0 ? whiteSquareSource : blackSquareSource;

          boardRow.push(buildSquare(background, LETTERS[file], r, null));
          file++;
        }
      }
    }

    loadedBoard.push(boardRow);
  }

  //// DEBUG
  // console.table(loadedBoard);
  PrintBoardTilePosition(loadedBoard);
  PrintBoardTileColors(loadedBoard);
  PrintBoardPieces(loadedBoard);
  PrintBoardMovedStatus(loadedBoard);
  return loadedBoard;
};

const PrintBoardTilePosition = (board) => {
  console.table(
    board.map((row) => row.map((square) => square.letter + " " + square.number))
  );
};

const PrintBoardTileColors = (board) => {
  console.table(
    board.map((row) =>
      row.map((square) => (square.src === whiteSquareSource ? "W" : "B"))
    )
  );
};

const PrintBoardPieces = (board) => {
  console.table(
    board.map((row) =>
      row.map((square) => {
        if (!square.piece) return ".";

        let piece = square.piece;

        switch (piece.name) {
        case "rook":
          return piece.isWhite() ? "R" : "r";
        case "king":
          return piece.isWhite() ? "K" : "k";
        case "queen":
          return piece.isWhite() ? "Q" : "q";
        case "pawn":
          return piece.isWhite() ? "P" : "p";
        case "bishop":
          return piece.isWhite() ? "B" : "b";
        case "knight":
          return piece.isWhite() ? "N" : "n";
        default:
          return "invalid";
        }
      })
    )
  );
};

const PrintBoardMovedStatus = (board) => {
  console.table(
    board.map((row) =>
      row.map((square) => {
        if (!square.piece) return ".";

        let piece = square.piece;

        switch (piece.name) {
        case "rook":
          return piece.hasMoved ? "T" : "F";
        case "king":
          return piece.hasMoved ? "T" : "F";
        default:
          return "o";
        }
      })
    )
  );
};

export default fenToJSON;
