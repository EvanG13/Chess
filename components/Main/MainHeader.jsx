import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import logo from "../../assets/appImages/logo.png";
import { useIsFocused } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";

const MainHeader = ({ navigation }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [username, setUsername] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const token = sessionStorage.getItem("sessionToken");
    const username = sessionStorage.getItem("username");
    setSessionToken(token);
    setUsername(username);
  }, [isFocused]); // Update token state AFTER screen is focused to prevent timing issues when reading from sessionStorage

  const handleLogout = async () => {
    sessionStorage.clear();

    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    }

    // Clear session state and navigate to login screen
    setSessionToken(null);
    navigation.navigate("login");
  };

  return (
    <View style={styles.mainHeader}>
      <View style={styles.paddingLeft}></View>
      <View style={styles.navBar}>
        <Image source={logo} style={styles.logo} />
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Chess");
          }}
        >
          <Text style={styles.texts}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Chess");
          }}
        >
          <Text style={styles.texts}>Puzzles</Text>
        </Pressable>
        {sessionToken ? (
          <>
            <Pressable
              style={styles.navItem}
              onPress={() => {
                navigation.navigate("profile");
              }}
            >
              <Text style={styles.texts}>{username}</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={handleLogout}>
              <Text style={styles.texts}>Logout</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              style={styles.navItem}
              onPress={() => {
                navigation.navigate("login");
              }}
            >
              <Text style={styles.texts}>Login</Text>
            </Pressable>
            <Pressable
              style={styles.navItem}
              onPress={() => {
                navigation.navigate("register");
              }}
            >
              <Text style={styles.texts}>Register</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    backgroundColor: "green",
    height: "10%",
    width: "100%",
    alignItems: "center"
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    marginLeft: 10,
    marginRight: 10
  },
  navItem: {
    backgroundColor: "green",
    color: "white"
  },
  texts: {
    color: "white",
    fontSize: 38
  },
  logo: {
    height: 100,
    width: 100
  }
});

export default MainHeader;
