import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions //TODO: use the window listener to update the width and height of the page if user changes the window size
} from "react-native";
import MainHeader from "./MainHeader";
import chessBoardImg from "../../assets/appImages/chessboard.png";
import PlayGameOptions from "./PlayGameOptions";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const Main = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("userId") ? true : false);
  }, [isFocused]); // Update token state AFTER screen is focused to prevent timing issues when reading from sessionStorage
  return (
    <View style={styles.main}>
      <MainHeader navigation={navigation} />
      <View style={styles.mainBody}>
        <Image source={chessBoardImg} style={styles.pageHero} />
        <View style={styles.textParagraph}>
          <Text style={styles.paragraphHeader}>Stock Trout</Text>
          <Text style={styles.text}>
            Play chess online. <br></br>
            Learn chess through our{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => navigation.navigate("tutorial")}
            >
              Tutorial
            </Text>
            . <br></br>
            Play chess locally. <br></br>
            Practice infinte puzzles. <br></br>
            TikTok, Instagram Reels, Youtube shorts. <br></br>
            Temple Run and epic fails.<br></br>
            Have fun!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {isLoggedIn && (
            <Text style={styles.paragraphHeader}>Play Online</Text>
          )}
          {isLoggedIn && <PlayGameOptions navigation={navigation} />}
          <TouchableOpacity
            style={styles.localGameButton}
            onPress={() => {
              navigation.navigate("localGame");
            }}
          >
            <Text style={{ color: "white", fontSize: "20" }}>Local Game</Text>
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
  siteHeader: {
    fontSize: 30,
    color: "white",
    marginBottom: "5%"
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "Arial"
  },
  paragraphHeader: {
    color: "white",
    fontSize: 30,
    marginBottom: "5%",
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center"
  },
  textParagraph: {
    marginTop: "12%",
    width: "30%",
    height: "100%"
    // justifyContent: "center",
    //alignItems: "center"
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
    width: 0.2 * width,
    height: height * 0.7,
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  tutorial: {
    width: width * 0.28,
    height: width * 0.28
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
    height: 50,
    width: 200,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    marginTop: "5%"
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
