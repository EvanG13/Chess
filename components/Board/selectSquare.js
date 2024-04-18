import { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";
import handleCheckmate from "./handleCheckmate.js";
import King from "../../pieces/King.js";

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
  setValidMoves,
  kingSquare,
  setKingSquare
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
        setValidMoves([
          ...board[row][col].piece.getValidMoves(
            board,
            isWhiteTurn ? kingSquare.whiteKing : kingSquare.blackKing
          )
        ]);
      }
    }
    return;
  }

  //updating selected piece to newly selected square's piece
  if (
    board[row][col].piece !== null &&
    board[row][col].piece.color ===
      board[selectedSquare[0]][selectedSquare[1]].piece.color
  ) {
    setSelectedSquare([row, col]);
    setValidMoves([
      ...board[row][col].piece.getValidMoves(
        board,
        isWhiteTurn ? kingSquare.whiteKing : kingSquare.blackKing
      )
    ]);
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

    //updating moved piece's coordinates
    newBoard[row][col].piece.letter = LETTERS[col + 1];
    newBoard[row][col].piece.number = row;

    if (newBoard[row][col].piece.name === "king") {
      newBoard[row][col].piece.hasMoved = true;
      isWhiteTurn
        ? setKingSquare({ ...kingSquare, whiteKing: [row, col] })
        : setKingSquare({ ...kingSquare, blackKing: [row, col] });
    }
    newBoard[row][col].piece.letter = LETTERS[col + 1];
    newBoard[row][col].piece.number = row;
    newBoard[selectedSquare[0]][selectedSquare[1]].piece = null;
    setBoard(newBoard);
    setSelectedSquare([]);
    setValidMoves([]);
    let newTurn = !isWhiteTurn;
    setIsWhiteTurn(newTurn);
    // check if the new player is in checkmate
    let newPlayerColor = isWhiteTurn ? "black" : "white";
    let [kingRow, kingCol] = kingSquare[`${newPlayerColor}King`];
    let king = new King(newPlayerColor, LETTERS[kingCol + 1], kingRow);
    if (king.isCheckmate(newBoard)) {
      //TODO: set the isCheckmate state to true in the parent component. That will trigger a modal to pop up and using the player whos turn it
      //is, we can display the winner
      handleCheckmate(newPlayerColor);
    }
    return;
  } else {
    //deselecting current piece
    setSelectedSquare([]);
    setValidMoves([]);
    return;
  }
};

export default selectSquare;
