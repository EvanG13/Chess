import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Dimensions //TODO: use the window listener to update the width and height of the page if user changes the window size
} from "react-native";
import MainHeader from "./MainHeader";
import chessBoardImg from "../../assets/appImages/logo.png";
import PlayGameOptions from "./PlayGameOptions";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import * as SecureStore from "expo-secure-store";

const Main = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const isUserLoggedIn = async () => {
      setIsLoggedIn(
        (await SecureStore.getItemAsync("userId")) !== null ? true : false
      );
    };

    isUserLoggedIn();
  }, [isFocused]);
  return (
    <View style={styles.main}>
      <MainHeader navigation={navigation} />
      <View style={styles.mainBody}>
        {/*         <Image source={chessBoardImg} style={styles.pageHero} /> */}
        <View style={styles.rightSide}>
          <View style={styles.buttonContainer}>
            {isLoggedIn && <PlayGameOptions navigation={navigation} />}
            <Pressable
              style={styles.localGameButton}
              onPress={() => {
                navigation.navigate("localGame");
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Local Game</Text>
            </Pressable>
          </View>
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
  paragraphHeader: {
    color: "white",
    fontSize: 60,
    marginBottom: "5%",
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center"
  },
  mainBody: {
    height: "80%",
    width: "100%",
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  rightSide: {
    alignItems: "center"
  },
  buttonContainer: {
    width: 0.2 * width,
    height: height * 0.7,
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    flexDirection: "column"
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
    marginBottom: "2%"
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
