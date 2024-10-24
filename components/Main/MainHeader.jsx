import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
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
      await axiosInstance.post(`/logout`);
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
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Chess");
          }}
        >
          <Text style={{ color: "white" }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("tutorial");
          }}
        >
          <Text style={{ color: "white" }}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("tutorial");
          }}
        >
          <Text style={{ color: "white" }}>Puzzles</Text>
        </TouchableOpacity>
        {sessionToken ? (
          <>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                navigation.navigate("profile");
              }}
            >
              <Text style={{ color: "white" }}>{username}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
              <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                navigation.navigate("login");
              }}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                navigation.navigate("register");
              }}
            >
              <Text style={{ color: "white" }}>Register</Text>
            </TouchableOpacity>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50%",
    marginLeft: 10,
    marginRight: 10
  },
  navItem: {
    backgroundColor: "green",
    color: "white"
  },
  logo: {
    height: 60,
    width: 60
  }
});

export default MainHeader;
