import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  board: {
    flexDirection: "column"
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
  rightAlign: {
    padding: "2%",
    textAlign: "right"
  },
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  boardAndLogger: {
    height: height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  letters: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginLeft: 40,
    color: "white"
  },
  boardWithNumbers: {
    flexDirection: "row",
    color: "white"
  },
  flipped: {
    transform: [{ rotate: "180deg" }]
  },

  //chat
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
