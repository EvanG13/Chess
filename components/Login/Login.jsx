import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

const Login = ({navigation}) => {
  console.log(BACKEND_BASE_URL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill out all fields");
      return;
    }
   
    try{
      const response = await axios.post(`${BACKEND_BASE_URL}/login`, {email, password});
      
      if(response.status == 200){
        const token = response.data.sessionToken;
        sessionStorage.setItem("sessionToken", token);
        sessionStorage.setItem("username", email); //TODO change to use the username on response.data.username
        navigation.navigate("Chess");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
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
