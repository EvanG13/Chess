import handleSendChat from "./handleSendChat";
import { useState } from "react";
import ChatMessage from "./ChatMessage";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

const ChatContainer = ({ socket, chatLog, setChatLog }) => {
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

const styles = StyleSheet.create({
  chatContainer: {
    height: "40%",
    width: "100%"
  },

  chatSendContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row"
  },

  chatBox: {
    backgroundColor: "yellow",
    width: "80%"
  },

  chatLog:{
    height: "60%",
    width: "100%",
    backgroundColor: "white",
    borderColor: "black",
    padding: 3
  },

  sendMessageButton: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    height: "100%",
    width: "20%"
  }
});

export default ChatContainer;
