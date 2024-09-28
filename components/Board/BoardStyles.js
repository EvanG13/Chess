import { StyleSheet } from "react-native";

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
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
    zIndex: 1
  }
});
export default styles;
