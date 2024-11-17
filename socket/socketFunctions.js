import fenToJSON from "../components/Board/fenToJSON";

export const handleGameStart = (setters, data) => {
  setters.setIsStarted(true);
  const players = data.game.players;
  if (players[0].username === sessionStorage.getItem("username")) {
    setters.setBlackSideBoard(!players[0].isWhite);
    setters.setIsWhite(players[0].isWhite);
    setters.setPlayer1({
      name: players[0].username,
      rating: players[0].rating
    });
    setters.setPlayer2({
      name: players[1].username,
      rating: players[1].rating
    });
  } else {
    setters.setBlackSideBoard(!players[1].isWhite);
    setters.setIsWhite(players[1].isWhite);
    setters.setPlayer1({
      name: players[1].username,
      rating: players[1].rating
    });
    setters.setPlayer2({
      name: players[0].username,
      rating: players[0].rating
    });
  }
  sessionStorage.setItem("gameId", data.gameId);
};

//-------------------------------------------------------------------------

export const handleGameOver = (setters, data) => {
  const displayMessage = data.displayMessage;
  setters.setGameOverModalVisible(true);
  setters.setGameOverMessage(displayMessage);
};

//-------------------------------------------------------------------------

export const handleMoveMade = (setters, data) => {
  const whiteRemainingTime = data.whiteRemainingTime;
  const blackRemainingTime = data.blackRemainingTime;

  if (!data.isSuccess) {
    console.log(whiteRemainingTime + " " + blackRemainingTime);
    setters.setIsWhiteTurn((prev) => !prev);
    return; //TODO: the backend should send the previous fen so that we can revert the board state
  }
  const boardJson = fenToJSON(data.fen);
  const isWhiteTurn = data.isWhiteTurn;
  setters.setBoard({ ...setters.board, board: boardJson });
  setters.setIsWhiteTurn(isWhiteTurn);
  const newMove = {
    fen: data.fen,
    san: data.moveList[data.moveList.length - 1].moveAsSan
  };
  setters.moveList.push(newMove);
  setters.setMoveList([...setters.moveList]);
  setters.setMoveIndex(setters.moveList.length - 1);
  setters.setWhiteTimer(whiteRemainingTime);
  setters.setBlackTimer(blackRemainingTime);
};

//-------------------------------------------------------------------------

export const handleChatMessage = (setters, data) => {
  let log = setters.chatLog;
  log.push({ message: data.chatMessage });
  setters.setChatLog([...log]);
};

//-------------------------------------------------------------------------

export const handleDrawOffer = (setters) => {
  setters.setPromptType("acceptDraw");
  setters.setPromptVisible(true);
};
