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
    backgroundColor: "#252525"
  },
  loginCard: {
    borderRadius: 10,
    overflow: "hidden",
    width: "60%",
  },
  innerCard: {
    backgroundColor: "#121212",
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
