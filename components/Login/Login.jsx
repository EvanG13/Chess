import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Please fill out all fields");
      setTimeout(() => setError(""), 2000); 
      return;
    }
   
    try{
      const response = await axios.post(`${BACKEND_BASE_URL}/login`, {email, password});
      
      if(response.status == 200){
        const userResponse = await JSON.parse(response.data.user);
        sessionStorage.setItem("sessionToken", response.data.token);
        sessionStorage.setItem("username", userResponse.username);
        sessionStorage.setItem("userId", userResponse.id);
        navigation.navigate("Chess");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
      setTimeout(() => setError(""), 2000); 
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
            {error.length > 0 ? <Text style={styles.errorCard}>{error}</Text> : null}
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
  },
  errorCard: {
    color: 'white',
    fontSize: 20,
    borderRadius: 10,
  }
});

export default Login;
