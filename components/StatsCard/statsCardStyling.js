import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 120,
    backgroundColor: "#121212",
    borderRadius: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  innerCard: {
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center"
  },
  time: {
    color: "white",
    fontSize: 30
  },
  title: {
    color: "white",
    fontSize: 20,
    opacity: 0.85
  }
});

export default styles;
