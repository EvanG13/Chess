import Actions from "../types/Actions";
import {
  handleGameStart,
  handleMoveMade,
  handleGameOver,
  handleChatMessage,
  handleDrawOffer
} from "./socketFunctions";
const handleSocket = (event, setters) => {
  const { websocketResponseAction: action, data } = JSON.parse(event.data);
  console.info(action, data);

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
    console.info(data);
    break;
  case Actions.CHAT_MESSAGE: {
    handleChatMessage(setters, data);
    break;
  }
  case Actions.OFFER_DRAW: {
    handleDrawOffer(setters);
    break;
  }
  default:
    console.error("not a supported action type: " + event);
  }
};

export default handleSocket;
