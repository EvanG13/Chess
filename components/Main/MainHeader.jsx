import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

const MainHeader = ({navigation}) => {
  return (
    <View style={styles.mainHeader}>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("main");
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("login");
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("register");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    backgroundColor: "black",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MainHeader;
