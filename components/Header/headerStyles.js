import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    backgroundColor: "#121212",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%"
  },
  navItem: {
    marginBottom: 15,
    alignItems: "center"
  },
  texts: {
    color: "white",
    fontSize: 20
  },
  dropdownContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  dropdown: {
    width: "40%",
    fontSize: 20,
    marginBottom: 15
  },
  placeholderStyle: {
    color: "white"
  }
});

export default styles;
