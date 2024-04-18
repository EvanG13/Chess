import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import MainHeader from "./MainHeader";

const Main = ({ navigation }) => {
  return (
    <View>
      <MainHeader navigation={navigation} />
      <View style={styles.mainBody}>
        <Button
          title="Start Local Game"
          onPress={() => {
            navigation.navigate("localGame");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Main;
