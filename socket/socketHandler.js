import Actions from "../types/Actions";
import {
  handleGameStart,
  handleMoveMade,
  handleGameOver,
  handleChatMessage
} from "./socketFunctions";
const handleSocket = (event, setters) => {
  const { action, data } = JSON.parse(event.data);
  console.log(action, data);
  switch (action) {
    case Actions.GAME_START: {
      handleGameStart(setters, data);
      break;
    }
    case Actions.GAME_OVER:
      handleGameOver(setters, data);
      break;
    case Actions.MOVE_MADE: {
      handleMoveMade(setters, data);
      break;
    }
    case Actions.GAME_CREATED:
      console.log(data);
      break;
    case Actions.CHAT_MESSAGE: {
      handleChatMessage(setters, data);
      break;
    }
    default:
      console.log(event);
  }
};

export default handleSocket;
