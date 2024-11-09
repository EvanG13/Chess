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
  },
});

export default styles;
