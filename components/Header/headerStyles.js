import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    backgroundColor: "green",
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%"
  },
  navItem: {
    backgroundColor: "green",
    marginTop: 40
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
    marginTop: 40,
    width: "40%",
    fontSize: 20
  },
  placeholderStyle: {
    color: "white"
  }
});

export default styles;
