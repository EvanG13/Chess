import { StyleSheet } from "react-native";

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

  chatLog: {
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

export default styles;
