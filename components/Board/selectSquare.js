import { getNumberFromLetter } from "../Board/board.js";
import { LETTERS } from "../Board/board.js";
import King from "../../pieces/King.js";
import convertToChessNotation from "../Logger/toChessNotation.js";
import { EmitActions } from "../../types/Actions.js";

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
  setKingSquare,
  setHasWon,
  hasWon,
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
    return; //user is in detached head state where they cant make moves
  }
  let row = number;
  let col = getNumberFromLetter(letter);

  //no piece is selected currently | selecting new piece
  if (selectedSquare.length === 0) {
    if (board[row][col].piece) {
      if (
        (board[row][col].piece.color === "white" && isWhiteTurn && isWhite) ||
        (board[row][col].piece.color === "black" && !isWhiteTurn && !isWhite)
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
      //check if it was castling move
      if (Math.abs(col - selectedSquare[1]) === 2) {
        //if king is moving more than one square
        if (col < selectedSquare[1]) {
          // the castle is queenside
          newBoard[row][col + 1].piece = newBoard[row][0].piece; //place the rook from queenside next to king
          newBoard[row][0].piece = null; //remove the rook from queenside
          newBoard[row][col + 1].piece.letter = LETTERS[col + 2];
          newBoard[row][col + 1].piece.number = row;
          newBoard[row][col + 1].piece.hasMoved = true;
        } else {
          //the castle is kingside
          newBoard[row][col - 1].piece = newBoard[row][7].piece; //place the rook from kingside next to king
          newBoard[row][7].piece = null; //remove the rook from kingside
          newBoard[row][col - 1].piece.letter = LETTERS[col - 2];
          newBoard[row][col - 1].piece.number = row;
          newBoard[row][col - 1].piece.hasMoved = true;
        }
      }
    }
    if (newBoard[row][col].piece.name === "rook") {
      newBoard[row][col].piece.hasMoved = true;
    }
    newBoard[row][col].piece.letter = LETTERS[col + 1];
    newBoard[row][col].piece.number = row;
    newBoard[selectedSquare[0]][selectedSquare[1]].piece = null;
    //emit move to backend    1 2 3 4 5 6 7 8 
    const fromLetter =  LETTERS[selectedSquare[1] + 1];
    const toLetter =  LETTERS[col + 1];
    const fromTo = `${fromLetter}${8 - selectedSquare[0]}${toLetter}${8 - row}`;
    console.log(fromTo);
    console.log(JSON.stringify(socket));
    socket.sendMessage({
      action: EmitActions.MOVE_MADE,
      move: fromTo,
      gameId: sessionStorage.getItem("gameId"),
      playerId: sessionStorage.getItem("userId")
    });
    // setBoard(newBoard);
    setSelectedSquare([]);
    setValidMoves([]);
    let newTurn = !isWhiteTurn;
    // setIsWhiteTurn(newTurn);
    // check if the new player is in checkmate
    let newPlayerColor = isWhiteTurn ? "black" : "white";
    let [kingRow, kingCol] = kingSquare[`${newPlayerColor}King`];
    let king = new King(newPlayerColor, LETTERS[kingCol + 1], kingRow);
    if (king.isCheckmate(newBoard)) {
      setHasWon(true);
      setShowWinner(true);
      //is, we can display the winner
    }
    //update the move log
    //build new log
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
    const move = { notation, board: newBoardCopy, isWhiteTurn: newTurn };
    let newLog = [...log, move];
    setLog(newLog);
    setMoveIndex(newLog.length - 1);
    return;
  } else {
    //deselecting current piece
    setSelectedSquare([]);
    setValidMoves([]);
    return;
  }
};

export default selectSquare;
