import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Board from "./components/Board/Board.jsx";
import Main from "./components/Main/Main.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Profile from "./components/Profile/Profile.jsx";
import GameStat from "./components/Profile/GameStat.jsx";
import OnlineGameView from "./views/gameView/onlineGameView/OnlineGameView.jsx";
import ReviewGameView from "./views/gameView/gameReview/ReviewGameView.jsx";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        style={styles.container}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Chess" component={Main} />
        <Stack.Screen
          name="localGame"
          component={Board}
          initialParams={{ isLocalGame: true }}
        />
        <Stack.Screen name="onlineGame" component={OnlineGameView} />
        <Stack.Screen name="reviewGame" component={ReviewGameView} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="stats" component={GameStat} />
        {/* <Stack.Screen name="reviewGame" component={GameReview} /> */}
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
