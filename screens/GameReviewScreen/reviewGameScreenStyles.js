import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  reviewView: {
    flexDirection: "column",
    backgroundColor: "#252525",
    height: "100%",
    width: "100%",
  },
  rowOne: {
    flex: 1
  },
  rowTwo: {
    flex: 3
  },
  boardContainer: {
    flexDirection: "row"
  },
  moveLog: {
    height: height,
    width: width / 3
  },
  gameReviewFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%"
  }
});

export default styles;
