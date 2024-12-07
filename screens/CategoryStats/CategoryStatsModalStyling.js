import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalStyle: {
    backgroundColor: "#3B3B3B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    flexDirection: "column",
    gap: 30
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: "center"
  },
  outlineCircle: {
    borderColor: "green",
    backgroundColor: "transparent"
  },
  filledInCircle: {
    borderColor: "transparent",
    backgroundColor: "green"
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  categoryText: {
    fontSize: 25,
    color: "white"
  }
});

export default styles;
