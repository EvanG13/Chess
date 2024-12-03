import { EmitActions } from "../../constants/Actions";
import * as SecureStore from "expo-secure-store";

const handlers = {
  handleAcceptDraw: async (socket) => {
    socket.sendMessage({
      action: EmitActions.OFFER_DRAW,
      drawAction: "ACCEPT",
      gameId: await SecureStore.getItemAsync("gameId")
    });
  },

  handleConfirmDraw: async (socket) => {
    socket.sendMessage({
      action: EmitActions.OFFER_DRAW,
      drawAction: "OFFER",
      gameId: await SecureStore.getItemAsync("gameId")
    });
  },

  handleDeclineDraw: async (socket) => {
    socket.sendMessage({
      action: EmitActions.OFFER_DRAW,
      drawAction: "DENY",
      gameId: await SecureStore.getItemAsync("gameId")
    });
  },

  handleConfirmForfeit: async (socket) => {
    socket.sendMessage({
      action: EmitActions.FORFEIT,
      gameId: await SecureStore.getItemAsync("gameId")
    });
  },

  handleCancelForfeit: () => {},

  handlePromote: async (socket, piece, fromTo) => {
    console.log("in handlePromote " + fromTo + piece);
    socket.sendMessage({
      action: EmitActions.MOVE_MADE,
      move: fromTo + piece,
      gameId: await SecureStore.getItemAsync("gameId"),
      playerId: await SecureStore.getItemAsync("userId")
    });
  }
};

export default handlers;
