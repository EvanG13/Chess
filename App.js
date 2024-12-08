import React from "react";

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
import {
  SafeAreaProvider,
  initialWindowMetrics
} from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  }
});
