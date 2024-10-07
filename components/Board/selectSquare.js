import { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";
import convertToChessNotation from "../Logger/toChessNotation.js";
import { emitMove, handleCheckmate, isValidMove, movePiece, selectDifferentPiece, updateEnPassant, updateKingState } from "./selectSquareAlgs.js";

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
  setHasWon,
  setShowWinner,
  setLog,
  log,
  setMoveIndex,
  moveIndex,
  socket,
  isWhite
) => {
  if (moveIndex !== log.length - 1) {
    alert("Please move to the last move to make a move.");
    return; //user is in detached head state where they cant make moves 😔
  }

  //get the row and column of the square that was clicked
  let row = number;
  let col = getNumberFromLetter(letter);

  //if no piece is selected currently 
  if (selectedSquare.length === 0) {
    selectNewPiece( board, setSelectedSquare, setValidMoves, row, col, isWhiteTurn, isWhite, kingSquare);
    return;
  }

  //if a piece is currently selected but user clicked another of their own pieces
  if (
    board.board[row][col].piece !== null &&
    board.board[row][col].piece.color ===
      board.board[selectedSquare[0]][selectedSquare[1]].piece.color
  ) {
    selectDifferentPiece(setSelectedSquare, setValidMoves, board, isWhiteTurn, kingSquare, row, col);
    return;
  }

  // if a legal destination square is picked  
  if (isValidMove(board, selectedSquare, row, col, validMoves)) {
    let newBoard = movePiece(board, row, col, selectedSquare, LETTERS);

    //set enPassant state
    updateEnPassant(newBoard, row, col, isWhiteTurn, board, selectedSquare);
    //set king state or handle castling
    updateKingState(newBoard, row, col, isWhiteTurn, kingSquare, setKingSquare, selectedSquare, LETTERS);
   
    if (newBoard[row][col].piece.name === "rook") {
      newBoard[row][col].piece.hasMoved = true;
    }

    //emit move made to backend  
    emitMove(LETTERS, selectedSquare, row, col, socket);

    // check/handle if the new player is in checkmate
    const isCheckmate = handleCheckmate(isWhiteTurn, kingSquare, board, setHasWon, setShowWinner); //TODO: try passing in newBoard instead of board here.
    //TODO: emit a game over event if it was checkmate. This should be verified in backend.
    //update the move log
    const notation = convertToChessNotation(
      newBoard[row][col].piece.name,
      selectedSquare[0],
      selectedSquare[1],
      row,
      col
    );
    const newBoardCopy = newBoard.map((row) => [
      ...row.map((square) => ({ ...square }))
    ]);
    const move = { notation, board: newBoardCopy, isWhiteTurn: !isWhiteTurn };
    let newLog = [...log, move];
    setLog(newLog);
    setMoveIndex(newLog.length - 1);
    return;
  } 
    //deselecting current piece since user clicked away or finished moving their piece
    setSelectedSquare([]);
    setValidMoves([]);
};

export default selectSquare;
