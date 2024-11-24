import { EmitActions } from "../../types/Actions";
import * as SecureStore from "expo-secure-store";

const handleSendChat = async (socket, message) => {
  socket.sendMessage({
    action: EmitActions.CHAT_MESSAGE,
    username: await SecureStore.getItemAsync("username"),
    chatMessage: message,
    userId: await SecureStore.getItemAsync("userId")
  });
};

export default handleSendChat;
