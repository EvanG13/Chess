import handleSendChat from "./handleSendChat";
import { useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
  const [chatText, setChatText] = useState("");
  const [chatLog, setChatLog] = useState([]);

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatlog}>
        {chatLog.map((msg) => {
          return <ChatMessage messageObject={msg} />;
        })}
      </View>
      <View style={styles.chatSendContainer}>
        <TextInput
          style={styles.chatBox}
          value={chatText}
          onChangeText={setChatText}
        ></TextInput>
        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={() => {
            handleSendChat(socket, chatText);
            setChatText("");
          }}
        >
          Send
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChatContainer;
