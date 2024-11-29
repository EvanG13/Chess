import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  reviewView: {
    flexDirection: "column",
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly"
  },
  rowOne: {
    flex: 1
  },
  rowTwo: {
    flex: 2
  },
  boardContainer: {
    flexDirection: "row"
  },

  moveLog: {
    height: height,
    width: width / 3
  }
});

export default styles;
