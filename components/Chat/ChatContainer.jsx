import handleSendChat from "./handleSendChat";
import { useState } from "react";
import ChatMessage from "./ChatMessage";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

import styles from "./ChatContainerStyles";

const ChatContainer = ({ socket, chatLog }) => {
  const [chatText, setChatText] = useState("");

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatLog}>
        {chatLog.map((msg, index) => {
          return <ChatMessage messageObject={msg} key={index} />;
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
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatContainer;
