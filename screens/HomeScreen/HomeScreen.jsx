import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import * as SecureStore from "expo-secure-store";
import Header from "../../components/Header/Header";
import PlayGameOptions from "./PlayGameOptions";

const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const isUserLoggedIn = async () => {
      setIsLoggedIn((await SecureStore.getItemAsync("userId")) !== null);
    };

    isUserLoggedIn();
  }, [isFocused]);
  return (
    <View style={styles.main}>
      <Header navigation={navigation} />
      <View style={styles.mainBody}>
        <View style={styles.rightSide}>
          <Text style={styles.welcomeHeader}>Stock Trout</Text>
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
  welcomeHeader: {
    color: "white",
    fontFamily: "cursive",
    fontWeight: "bold",
    fontSize: 60
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
    width: 0.7 * width,
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

export default HomeScreen;
