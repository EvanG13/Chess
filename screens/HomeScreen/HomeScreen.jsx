import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import * as SecureStore from "expo-secure-store";
import PlayGameOptions from "./PlayGameOptions";
import Header from "@/components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

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
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
        <Header navigation={navigation} />
        <View style={styles.mainBody}>
          <View>
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
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#121212" />
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  welcomeHeader: {
    color: "white",
    fontFamily: "cursive",
    fontWeight: "bold",
    fontSize: 60
  },
  rightSide: {
    alignItems: "center"
  },
  buttonContainer: {
    width: 0.7 * width,
    height: height * 0.7,
    marginTop: "5%",
    marginBottom: "5%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    flexDirection: "column"
  },
  localGameButton: {
    height: 50,
    width: 200,
    backgroundColor: "#121212",
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
    fontSize: 21,
    textAlign: "center",
    marginBottom: "5%"
  }
});

export default HomeScreen;
