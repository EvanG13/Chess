import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  reviewView: {
    backgroundColor: "black",
    height: height,
    width: width,
    flexDirection: "row"
  },

  boardContainer: {
    flexDirection: "column",
    height: height,
    width: (2 * width) / 3
  },

  moveLog: {
    height: height,
    width: width / 3
  }
});

export default styles;
