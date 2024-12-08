import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import PlayGameOptions from "./PlayGameOptions";
import Header from "@/components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import styles from "./homeScreenStyles";

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

export default HomeScreen;
