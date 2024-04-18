import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      alert("Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //TODO: fetch request to backend
  };

  return (
    <View style={styles.registerContainer}>
      <View style={styles.registerCard}>
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
            <Text style={styles.registerHeader}>Register</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
          </View>
        </LinearGradient>
      </View>
    </View>
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
    backgroundColor: "black"
  },
  registerCard: {
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

export default Register;
