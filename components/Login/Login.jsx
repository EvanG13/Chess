import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill out all fields");
      return;
    }
    //TODO: fetch request to backend
    //https://jqvrnfo1z4.execute-api.us-east-1.amazonaws.com/dev
    const response = await axios.post(BACKEND_BASE_URL + "login", {
      email,
      password
    });

    console.log(response);

    if (response.data.status === 200) {
      //TODO handle jwt token / create userProvider & put response.user in it
      console.log("LOGIN SUCCESS");
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCard}>
        {/* Rainbow border */}
        <LinearGradient
          colors={[
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet"
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {/* Black background inside the card */}
          <View style={styles.innerCard}>
            <Text style={styles.loginHeader}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white"
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  loginCard: {
    borderRadius: 10,
    overflow: "hidden", // Ensure the inner gradient doesn't overflow
    width: "60%"
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2, // Add borderWidth to create a border
    borderColor: "transparent" // Set initial borderColor to transparent
  },
  innerCard: {
    backgroundColor: "black",
    padding: 20
  },
  input: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  }
});

export default Login;
