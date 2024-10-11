const Actions = Object.freeze({
  GAME_START: "GAME_START",
  GAME_OVER: "GAME_OVER",
  MOVE_MADE: "MOVE_MADE",
  CHAT_MESSAGE: "CHAT_MESSAGE",
  GAME_CREATED: "GAME_CREATED",
  OFFER_DRAW: "OFFER_DRAW",
});

export const EmitActions = Object.freeze({
  GAME_START: "GAME_START",
  GAME_OVER: "GAME_OVER",
  MOVE_MADE: "makeMove",
  CHAT_MESSAGE: "message",
  GAME_CREATED: "GAME_CREATED",
  FORFEIT: "resign",
  OFFER_DRAW: "offerDraw"
});

export default Actions;
