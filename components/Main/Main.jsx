import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import MainHeader from "./MainHeader";
import greenPieces from "../../assets/appImages/greenPieces.jpg";
import tutorialImage from "../../assets/appImages/chessTutorial.jpeg";
import pageHero from "../../assets/appImages/pageHero.png";
import PlayGameOptions from "./PlayGameOptions";

const Main = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <MainHeader navigation={navigation} />
      <View style={styles.mainBody}>
        <Text style={styles.siteHeader}>StockTrout</Text>
        <Image source={pageHero} style={styles.pageHero} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%"
          }}
        >
          <View style={{ height: "40%", width: "20%", borderRadius: 10 }}>
            <Image source={greenPieces} style={styles.greenPieces} />
            <Button
              style={styles.localGameButton}
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
            <Text style={{ color: "white", fontSize: 20 }}>Chess Tutorial</Text>
            <Image source={tutorialImage} style={styles.tutorialImage} />
          </TouchableOpacity>
          {sessionStorage.getItem("userId") && (
            <PlayGameOptions style={styles.onlineGamesContainer} />
          )}
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
  siteHeader: {
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
    width: "30%",
    height: "30%"
  },
  tutorial: {
    width: 120,
    height: 120
  },
  tutorialImage: {
    width: "80%",
    height: "80%"
  },
  pageHero: {
    marginBottom: "5%",
    width: "15%",
    height: "15%"
  },
  localGameButton: {
    height: 30,
    width: 30
  },
  onlineGamesContainer: {
    height: "60%",
    width: "60%"
  }
});

export default Main;
