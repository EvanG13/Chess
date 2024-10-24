import Actions from "../../types/Actions";
import fenToJSON from "./fenToJSON";
const handleSocket = (event, setters) => {
  const { action, data } = JSON.parse(event.data);
  console.log(action, data);
  switch (action) {
  case Actions.GAME_START: {
    console.log(data);
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

    break;
  }
  case Actions.GAME_OVER:
    console.log(data);
    break;
  case Actions.MOVE_MADE: {
    const whiteRemainingTime = data.whiteRemainingTime;
    const blackRemainingTime = data.blackRemainingTime;

    if (!data.isSuccess) {
      console.log(whiteRemainingTime + " " + blackRemainingTime);
      return;
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
    break;
  }
  case Actions.GAME_CREATED:
    console.log(data);
    break;
  case Actions.CHAT_MESSAGE: {
    console.log(data);
    let log = setters.chatLog;
    log.push({ message: data.chatMessage });
    setters.setChatLog([...log]);
    break;
  }
  default:
    console.log(event);
  }
};

export default handleSocket;
