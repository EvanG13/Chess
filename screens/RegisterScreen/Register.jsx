import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axiosInstance from "@/services/axios/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleRegister = async () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
      setError("Please fill out all fields");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 2000);
      return;
    }
    try {
      const response = await axiosInstance.post("/register", {
        email,
        username,
        password
      });
      if (response.status === 200) {
        navigation.navigate("login");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data);
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <SafeAreaView style={styles.registerContainer}>
      <View style={styles.registerCard}>
        <View style={styles.innerCard}>
          <Text style={styles.registerHeader}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button title="Register" onPress={handleRegister} />
          {error.length > 0 ? (
            <Text style={styles.errorCard}>{error}</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white"
  },
  registerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525"
  },
  registerCard: {
    borderRadius: 10,
    overflow: "hidden",
    width: "60%"
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent"
  },
  innerCard: {
    backgroundColor: "#121212",
    padding: 20
  },
  input: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  errorCard: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    borderRadius: 10
  }
});

export default Register;
