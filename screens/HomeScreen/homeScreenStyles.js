import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  welcomeHeader: {
    color: "white",
    fontFamily: "cursive",
    fontWeight: "bold",
    fontSize: 60
  },
  rightSide: {
    alignItems: "center"
  },
  buttonContainer: {
    width: 0.7 * width,
    height: height * 0.7,
    marginTop: "5%",
    marginBottom: "5%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    flexDirection: "column"
  },
  localGameButton: {
    height: 50,
    width: 200,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    marginTop: "5%"
  },
  onlineGamesContainer: {
    height: "60%",
    width: "60%"
  },
  cardHeader: {
    color: "white",
    fontSize: 21,
    textAlign: "center",
    marginBottom: "5%"
  }
});

export default styles;
