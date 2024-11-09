//what to recieve from backend
const Actions = Object.freeze({
  GAME_START: "GAME_START",
  GAME_OVER: "GAME_OVER",
  MOVE_MADE: "MOVE_MADE",
  CHAT_MESSAGE: "CHAT_MESSAGE",
  GAME_CREATED: "GAME_CREATED",
  OFFER_DRAW: "DRAW_OFFER"
});

//what to emit to backend
export const EmitActions = Object.freeze({
  GAME_OVER: "GAME_OVER",
  MOVE_MADE: "makeMove",
  CHAT_MESSAGE: "message",
  FORFEIT: "resign",
  OFFER_DRAW: "offerDraw",
  ACCEPT_DRAW: "accept",
  DECLINE_DRAW: "decline"
});

export default Actions;
