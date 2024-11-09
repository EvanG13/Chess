import { EmitActions } from "../../types/Actions";
import King from "../../pieces/King";

export const selectNewPiece = (
  board,
  setSelectedSquare,
  setValidMoves,
  row,
  col,
  isWhiteTurn,
  isWhite,
  kingSquare
) => {
  if (board.board[row][col].piece) {
    if (
      (board.board[row][col].piece.color === "white" &&
        isWhiteTurn &&
        isWhite) ||
      (board.board[row][col].piece.color === "black" &&
        !isWhiteTurn &&
        !isWhite)
    ) {
      setSelectedSquare([row, col]);
      setValidMoves([
        ...board.board[row][col].piece.getValidMoves(
          board,
          isWhiteTurn ? kingSquare.whiteKing : kingSquare.blackKing
        )
      ]);
    }
  }
};

export const selectDifferentPiece = (
  setSelectedSquare,
  setValidMoves,
  board,
  isWhiteTurn,
  kingSquare,
  row,
  col
) => {
  setSelectedSquare([row, col]);
  setValidMoves([
    ...board.board[row][col].piece.getValidMoves(
      board,
      isWhiteTurn ? kingSquare.whiteKing : kingSquare.blackKing
    )
  ]);
  return;
};

export const isValidMove = (board, selectedSquare, row, col, validMoves) => {
  return (
    board.board[selectedSquare[0]][selectedSquare[1]].piece.isValidMove(
      row,
      col,
      validMoves
    ) === true
  );
};

export const movePiece = (board, row, col, selectedSquare, LETTERS) => {
  const newBoard = [...board.board];

  //place the piece in its legal destination square
  newBoard[row][col].piece =
    board.board[selectedSquare[0]][selectedSquare[1]].piece;

  //update moved piece's coordinates
  newBoard[row][col].piece.letter = LETTERS[col + 1];
  newBoard[row][col].piece.number = row;
  //remove the moved piece from its starting square
  newBoard[selectedSquare[0]][selectedSquare[1]].piece = null;
  return newBoard;
};

export const updateEnPassant = (
  newBoard,
  row,
  col,
  isWhiteTurn,
  board,
  selectedSquare
) => {
  //setting enPassant if moved piece was a pawn or capturing enPassant'd pawn
  if (newBoard[row][col].piece.name === "pawn") {
    let dir = isWhiteTurn ? 1 : -1;

    //did we just enPassant? we will take that enemy pawn
    if (
      board.enPassant.length > 0 &&
      board.enPassant[0] === row + dir &&
      board.enPassant[1] === col
    ) {
      board.board[board.enPassant[0]][board.enPassant[1]].piece = null;
      board.enPassant = [];
    }
    //did we move to an enPassantable square? set enPassant
    else {
      let prevrow = isWhiteTurn ? 6 : 1;
      let newrow = isWhiteTurn ? 4 : 3;

      if (selectedSquare[0] === prevrow && row === newrow) {
        board.enPassant = [row, col];
      }
    }
  } else {
    board.enPassant = [];
  }
};

export const updateKingState = (
  newBoard,
  row,
  col,
  isWhiteTurn,
  kingSquare,
  setKingSquare,
  selectedSquare,
  LETTERS
) => {
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
};

export const emitMove = (LETTERS, selectedSquare, row, col, socket) => {
  const fromLetter = LETTERS[selectedSquare[1] + 1];
  const toLetter = LETTERS[col + 1];
  const fromTo = `${fromLetter}${8 - selectedSquare[0]}${toLetter}${8 - row}`;
  socket.sendMessage({
    action: EmitActions.MOVE_MADE,
    move: fromTo,
    gameId: sessionStorage.getItem("gameId"),
    playerId: sessionStorage.getItem("userId")
  });
};

export const handleCheckmate = (
  isWhiteTurn,
  kingSquare,
  board,
  setHasWon,
  setShowWinner,
  LETTERS
) => {
  let newPlayerColor = isWhiteTurn ? "black" : "white";
  let [kingRow, kingCol] = kingSquare[`${newPlayerColor}King`];
  let king = new King(newPlayerColor, LETTERS[kingCol + 1], kingRow);
  if (king.isCheckmate(board)) {
    setHasWon(true);
    setShowWinner(true);
    return true;
  }
  return false;
};
