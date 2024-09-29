import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import MainHeader from "./MainHeader";
import greenPieces from "../../assets/appImages/greenPieces.jpg";
import tutorialImage from "../../assets/appImages/chessTutorial.jpeg";
import chessBoardImg from "../../assets/appImages/chessboard.png";
import PlayGameOptions from "./PlayGameOptions";

const { width, height } = Dimensions.get('window');

const Main = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <MainHeader navigation={navigation} />
      <View style={styles.mainBody}>
        <Image source={chessBoardImg} style={styles.pageHero} />
        <TouchableOpacity
            style={styles.tutorial}
            onPress={() => {
              navigation.navigate("tutorial");
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Chess Tutorial</Text>
            <Image source={tutorialImage} style={styles.tutorialImage} />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
         
             {sessionStorage.getItem("userId") &&
            <Text style={styles.cardHeader}>Play Online</Text>
             }
             {sessionStorage.getItem("userId") && (
            <PlayGameOptions
              navigation={navigation}
            />
            
          )}
             <Button
              style={styles.localGameButton}
              title="Local Game"
              onPress={() => {
                navigation.navigate("localGame");
              }}
            />
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
           
  },
  buttonContainer: {
    width: .2 * width,
    height: height * .7,
    marginBottom: "5%",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
  },
  tutorial: {
    width: width * 0.28,
    height: width * 0.28,
  },
  tutorialImage: {
    width: "80%",
    height: "80%"
  },
  pageHero: {
    marginBottom: "2%",
    width: width * 0.28,
    height: width * 0.28
  },
  localGameButton: {
    marginTop: "5%",
    height: 30,
    width: 30
  },
  onlineGamesContainer: {
    height: "60%",
    width: "60%"
  },
  cardHeader: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: "5%"
  }
  
});

export default Main;
