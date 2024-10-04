import {EmitActions} from "../../types/Actions";


const handleSendChat = (socket, message) =>{
    socket.sendMessage({
        action: EmitActions.CHAT_MESSAGE,
        username: sessionStorage.getItem("username"),
        chatMessage: message,
        userId: sessionStorage.getItem("userId")
      });
}

export default handleSendChat;