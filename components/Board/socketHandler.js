import Actions from "../../types/Actions";
import fenToJSON from "./fenToJSON";
const handleSocket = (event, setters) => {
  const { action, data } = JSON.parse(event.data);
  console.log(action, data);
  switch (action) {
  case Actions.GAME_START:
    console.log(data);
    setters.setIsStarted(true);
    const players = data.game.players;
    if(players[0].username === sessionStorage.getItem("username")){
      setters.setBlackSideBoard(!players[0].isWhite);
      setters.setIsWhite(players[0].isWhite);
    }
    else{
      setters.setBlackSideBoard(!players[1].isWhite);
      setters.setIsWhite(players[1].isWhite);
    }
    sessionStorage.setItem("gameId", data.gameId);
    break;
  case Actions.GAME_OVER:
    console.log(data);
    break;
  case Actions.MOVE_MADE: {
    console.log(data);
    if (!data.isSuccess) {
      console.log("Invalid move");
      return;
    }
    const boardJson = fenToJSON(data.fen);
    const isWhiteTurn = data.isWhiteTurn;
    setters.setBoard(boardJson);
    setters.setIsWhiteTurn(isWhiteTurn);
    break;
  }
  case Actions.GAME_CREATED:
    console.log(data);
    break;
  case Actions.CHAT_MESSAGE:
    console.log(data);
    break;
  default:
    console.log(event);
  }
};

export default handleSocket;
