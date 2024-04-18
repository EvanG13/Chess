import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

const MainHeader = ({ navigation }) => {
  return (
    <View style={styles.mainHeader}>
      <View style={styles.paddingLeft}></View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Chess");
          }}
        >
          <Text style={{ color: "white" }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("register");
          }}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    backgroundColor: "black",
    height: "10%",
    width: "100%",
    alignItems: "center"
  },
  paddingLeft: {
    flex: 1
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1, // Take up remaining space
    marginLeft: 10,
    marginRight: 10 
  },
  navItem: {
    backgroundColor: "black",
    color: "white"
  }
});

export default MainHeader;
