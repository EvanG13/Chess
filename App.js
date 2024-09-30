import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Board } from "./components/Board/Board.jsx";
import Main from "./components/Main/Main.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Tutorial from "./components/Tutorial/Tutorial.jsx";
import Stats from "./components/Profile/Stats.jsx";
import GameStat from "./components/Profile/GameStat.jsx";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen name="Chess" component={Main} />
        <Stack.Screen
          name="localGame"
          component={Board}
          initialParams={{ isLocalGame: true }}
        />
        <Stack.Screen name="onlineGame" component={Board} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="tutorial" component={Tutorial} />
        <Stack.Screen name="profile" component={Stats} />
        <Stack.Screen name="stats" component={GameStat} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "black"
  },
  text: {
    color: "white"
  }
});
