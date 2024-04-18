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
      <View style={styles.navBar}>
        <Button
          style={styles.navItem}
          title="Home"
          onPress={() => {
            navigation.navigate("main");
          }}
        />
        <Button
          style={styles.navItem}
          title="Login"
          onPress={() => {
            navigation.navigate("login");
          }}
        />
        <Button
          style={styles.navItem}
          title="Register"
          onPress={() => {
            navigation.navigate("register");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    backgroundColor: "black",
    width: "100%",
    height: 50,
    justifyContent: "right",
    alignItems: "center"
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "20%",
    margin: "1%"
  },
  navItem: {
    margin: 10
  }
});

export default MainHeader;
