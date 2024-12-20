import { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";
import {
  emitMove,
  handleCheckmate,
  isValidMove,
  movePiece,
  selectDifferentPiece,
  selectNewPiece,
  updateEnPassant,
  updateKingState
} from "./selectSquareAlgs.js";

const selectSquare = (
  number,
  letter,
  board,
  selectedSquare,
  setSelectedSquare,
  isWhiteTurn,
  validMoves,
  setValidMoves,
  kingSquare,
  setKingSquare,
  socket,
  isWhite,
  setIsWhiteTurn,
  setPromptType,
  setPromptVisible,
  isGameOver
) => {
  if (isGameOver) {
    return;
  }
  //get the row and column of the square that was clicked
  let row = number;
  let col = getNumberFromLetter(letter);

  //if no piece is selected currently
  if (selectedSquare.length === 0) {
    selectNewPiece(
      board,
      setSelectedSquare,
      setValidMoves,
      row,
      col,
      isWhiteTurn,
      isWhite,
      kingSquare
    );
    return;
  }

  //if a piece is currently selected but user clicked another of their own pieces
  if (
    board.board[row][col].piece !== null &&
    board.board[row][col].piece.color ===
      board.board[selectedSquare[0]][selectedSquare[1]].piece.color
  ) {
    selectDifferentPiece(
      setSelectedSquare,
      setValidMoves,
      board,
      isWhiteTurn,
      kingSquare,
      row,
      col
    );
    return;
  }

  // if a legal destination square is picked
  if (isValidMove(board, selectedSquare, row, col, validMoves)) {
    let newBoard = movePiece(
      board,
      row,
      col,
      selectedSquare,
      LETTERS,
      setIsWhiteTurn,
      setPromptType,
      setPromptVisible
    );
    if (newBoard === "promote") {
      //deselect current piece since finished promoting their piece
      setSelectedSquare([]);
      setValidMoves([]);
      return;
    } //if the move was a pawn promotion, return early as control is now in the promotion modal.

    //set enPassant state
    updateEnPassant(newBoard, row, col, isWhiteTurn, board, selectedSquare);
    //set king state / handle castling
    updateKingState(
      newBoard,
      row,
      col,
      isWhiteTurn,
      kingSquare,
      setKingSquare,
      selectedSquare,
      LETTERS
    );

    if (newBoard[row][col].piece.name === "rook") {
      newBoard[row][col].piece.hasMoved = true;
    }

    //emit move made to backend
    emitMove(LETTERS, selectedSquare, row, col, socket);

    // check/handle if the new player is in checkmate
    const isCheckmate = handleCheckmate(
      isWhiteTurn,
      kingSquare,
      board,
      LETTERS
    ); //TODO: try passing in newBoard instead of board here.

    if (isCheckmate) {
      console.log("checkmate detected!");
    }
    //update the move log
  }
  //deselect current piece since user clicked away or finished moving their piece
  setSelectedSquare([]);
  setValidMoves([]);
};

export default selectSquare;
