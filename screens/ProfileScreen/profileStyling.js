import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  stats: {
    backgroundColor: "#252525",
    flex: 1
  },
  main: {
    flexDirection: "column",
    height: "80%",
    marginTop: "4%"
  },
  gameHeader: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    marginLeft: 10
  },
  gameHeaderText: {
    fontSize: 20,
    color: "white"
  },
  resultAndMoves: {
    flexDirection: "row",
    gap: 15
  },
  rawStats: {
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    width: "90%"
  },
  statCards: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  usernameHeader: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10
  },
  cardStyle: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  timeStyle: {
    display: "none"
  },
  titleStyle: {
    fontSize: 10,
    fontWeight: "bold"
  },
  secondaryHeader: {
    flexDirection: "column"
  }
});

export default styles;
