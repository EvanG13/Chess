import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  GameStat: {
    backgroundColor: "#252525",
    flex: 1
  },
  diagnosticsText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  diagnostics: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
    marginBottom: 15
  },
  timeControlTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center"
  },
  usernameHeader: {
    color: "white",
    fontSize: 30,
    alignSelf: "center"
  },
  archivedGamesHeader: {
    color: "white",
    fontSize: 20,
    padding: 5,
    alignSelf: "center"
  },
  ratingContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  innerDiagnosticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#121212",
    borderRadius: 8,
    padding: 10
  },
  statContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  statLabel: {
    color: "lightgray",
    fontSize: 12
  },
  ratingText: {
    fontSize: 40
  }
});

export default styles;
