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
        <Text style={styles.siteHeader}>KysCleveEvan Chess</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%"  }}>
          <View style={{height: "80%", width: "40%", borderRadius: 10}}>
            <Image source={greenPieces} style={styles.greenPieces} />
            <Button
              title="Start Local Game"
              onPress={() => {
                navigation.navigate("localGame");
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.tutorial}
            onPress={() => {
              navigation.navigate("tutorial");
            }}
          >
            <Text style={{color: "white",  fontSize: 20}}>Chess Tutorial</Text>
            <Image source={tutorialImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  siteHeader:{
    fontSize: 30,
    color: "white",
    marginBottom: "5%"
  },
  mainBody: {
    height: "80%",
    width: "100%",
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  greenPieces: {
    width: "100%",
    height: "100%"
  },
  tutorial: {
    width: "50%",
    height: "80%",
    marginBottom: "5%"
  }
});

export default Main;
