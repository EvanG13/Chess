import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import loginStyles from "./loginStyles";
import axiosInstance from "@/services/axios/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Please fill out all fields");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password
      });

      if (response.status === 200) {
        const userResponse = response.data.user;
        await SecureStore.setItemAsync("sessionToken", response.data.token);
        await SecureStore.setItemAsync("username", userResponse.username);
        await SecureStore.setItemAsync("userId", userResponse.id.toString());

        navigation.navigate("Chess");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <SafeAreaView style={loginStyles.loginContainer}>
      <View style={loginStyles.loginCard}>
        <View style={loginStyles.innerCard}>
          <Text style={loginStyles.loginHeader}>Login</Text>
          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          {error.length > 0 ? (
            <Text style={loginStyles.errorCard}>{error}</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
