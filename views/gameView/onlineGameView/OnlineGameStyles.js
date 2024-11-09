import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gameView: {
    backgroundColor: "black",
    alignItems: "center",
    height: height,
    width: width,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  playerAndTimer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
    height: "fit-content"
  }
});

export default styles;
