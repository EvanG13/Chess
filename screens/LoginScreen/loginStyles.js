import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  loginHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white"
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  loginCard: {
    borderRadius: 10,
    overflow: "hidden", // Ensure the inner gradient doesn't overflow
    width: "60%"
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2, // Add borderWidth to create a border
    borderColor: "transparent" // Set initial borderColor to transparent
  },
  innerCard: {
    backgroundColor: "black",
    padding: 20
  },
  input: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  errorCard: {
    color: "white",
    fontSize: 20,
    borderRadius: 10
  }
});

export default loginStyles;
