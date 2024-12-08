import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
    backgroundColor: "#252525"
  },
  fill: {
    flex: 1
  },
  winnerText: {
    textAlign: "center",
    color: "black",
    backgroundColor: "white"
  },
  darkGreen: {
    backgroundColor: "#006400",
    color: "white"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  boardContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#252525"
  },
  boardAndLogger: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#252525",
    gap: 10
  },
  letters: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginLeft: 40,
    color: "white",
    backgroundColor: "#252525"
  },
  boardWithNumbers: {
    flexDirection: "row",
    color: "white"
  },
  flipped: {
    transform: [{ rotate: "180deg" }]
  },
  chatSendContainer: {
    height: "4%",
    width: "100%",
    flexDirection: "row"
  },
  chatBox: {
    backgroundColor: "yellow"
  },
  sendMessageButton: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    height: "100%",
    width: "20%"
  },
  playerAndTimer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
export default styles;
