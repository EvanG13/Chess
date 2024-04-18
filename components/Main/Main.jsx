import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import MainHeader from "./MainHeader";
import greenPieces from "../../assets/appImages/greenPieces.jpg";
import tutorialImage from "../../assets/appImages/chessTutorial.jpeg";

const Main = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <MainHeader navigation={navigation} />
      <View style={styles.mainBody}>
        <Text>KysCleveEvan Chess</Text>
        <Image source={greenPieces} style={styles.greenPieces} />
        <Button
          title="Start Local Game"
          onPress={() => {
            navigation.navigate("localGame");
          }}
        />
        <TouchableOpacity
          style={styles.tutorial}
          onPress={() => {
            navigation.navigate("tutorial");
          }}
        >
          <Image source={tutorialImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  mainBody: {
    height: "80%",
    width: "100%",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  greenPieces: {
    width: "70%",
    height: "45%"
  },
  tutorial: {
    width: "70%",
    height: "40%",
    marginBottom: "5%"
  }
});

export default Main;
