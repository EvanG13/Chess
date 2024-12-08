import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import axiosInstance from "@/services/axios/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./registerStyling";

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

export default Register;
