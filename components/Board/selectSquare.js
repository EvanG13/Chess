import { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";

const selectSquare = (
  number,
  letter,
  board,
  setBoard,
  selectedSquare,
  setSelectedSquare,
  isWhiteTurn,
  setIsWhiteTurn,
  validMoves,
  setValidMoves
) => {
  let row = number;
  let col = getNumberFromLetter(letter);

  //no piece is selected currently | selecting new piece
  if (selectedSquare.length === 0) {
    if (board[row][col].piece) {
      if (
        (board[row][col].piece.color === "white" && isWhiteTurn) ||
        (board[row][col].piece.color === "black" && !isWhiteTurn)
      ) {
        setSelectedSquare([row, col]);
        setValidMoves([...board[row][col].piece.getValidMoves(board)]);
      }
    }
    return;
  }

  //updating selected piece
  if (
    board[row][col].piece !== null &&
    board[row][col].piece.color ===
      board[selectedSquare[0]][selectedSquare[1]].piece.color
  ) {
    setSelectedSquare([row, col]);
    setValidMoves([...board[row][col].piece.getValidMoves(board)]);
    return;
  }

  //moving selected piece if a legal square is picked
  if (
    board[selectedSquare[0]][selectedSquare[1]].piece.isValidMove(
      row,
      col,
      validMoves
    ) === true
  ) {
    const newBoard = [...board];
    newBoard[row][col].piece =
      board[selectedSquare[0]][selectedSquare[1]].piece;
    if (newBoard[row][col].piece.name === "king") {
      newBoard[row][col].piece.hasMoved = true;
    }
    newBoard[row][col].piece.letter = LETTERS[col + 1];
    newBoard[row][col].piece.number = row;
    newBoard[selectedSquare[0]][selectedSquare[1]].piece = null;
    setBoard(newBoard);
    setSelectedSquare([]);
    setValidMoves([]);
    let newTurn = !isWhiteTurn;
    setIsWhiteTurn(newTurn);
    return;
  } else {
    //deselecting current piece
    setSelectedSquare([]);
    setValidMoves([]);
    return;
  }
};

export default selectSquare;