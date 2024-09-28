import Actions from "../../types/Actions";

const handleSocket = (event, setters) => {
  console.log(event);
  const { action, data } = event;
  switch (action) {
    case Actions.GAME_START:
      console.log(data);
      break;
    case Actions.GAME_OVER:
      console.log(data);
      break;
    case Actions.MOVE_MADE:
      console.log(data);
      break;
    case Actions.CHAT_MESSAGE:
      console.log(data);
      break;
    default:
      console.log(data);
  }
};
