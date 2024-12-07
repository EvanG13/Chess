import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Board from "./components/Board/Board.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnlineGameScreen from "./screens/OnlineGameScreen/OnlineGameScreen";
import Login from "./screens/LoginScreen/Login";
import Register from "./screens/RegisterScreen/Register";
import Profile from "./screens/ProfileScreen/Profile";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ReviewGameScreen from "./screens/GameReviewScreen/ReviewGameScreen";
import GameStat from "@/screens/CategoryStats/GameStat";

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
        <Stack.Screen name="Chess" component={HomeScreen} />
        <Stack.Screen
          name="localGame"
          component={Board}
          initialParams={{ isLocalGame: true }}
        />
        <Stack.Screen name="onlineGame" component={OnlineGameScreen} />
        <Stack.Screen name="reviewGame" component={ReviewGameScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="profile" component={Profile} />
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
