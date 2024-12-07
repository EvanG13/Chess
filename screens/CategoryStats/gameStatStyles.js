import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  GameStat: {
    backgroundColor: "black",
    height: "100%",
    width: "100%"
  },
  diagnosticsText: {
    color: "white",
    fontSize: 20
  },
  diagnostics: {
    margin: 20
  },
  timeControlTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center"
  },
  headerDropDown: {
    alignItems: "center", // Center text inside button
    justifyContent: "center"
  },
  usernameHeader: {
    color: "white",
    fontSize: 30,
    marginLeft: 10
  },
  todoButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  archivedGamesHeader: {
    color: "white",
    fontSize: 30,
    marginLeft: 10
  }
});

export default styles;
