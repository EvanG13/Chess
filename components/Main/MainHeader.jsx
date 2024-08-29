import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

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
    const token = sessionStorage.getItem("sessionToken");
    sessionStorage.removeItem("sessionToken");
    try{
    await axios.post(`${BACKEND_BASE_URL}/logout`, { sessionToken: token });
    } catch (error) {
      console.log(error);
    }
    setSessionToken(null); 
    navigation.navigate("login");
  };

  return (
    <View style={styles.mainHeader}>
      <View style={styles.paddingLeft}></View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Chess");
          }}
        >
          <Text style={{ color: "white" }}>Home</Text>
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
            <TouchableOpacity
              style={styles.navItem}
              onPress={handleLogout}
            >
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
    backgroundColor: "black",
    height: "10%",
    width: "100%",
    alignItems: "center",
  },
  paddingLeft: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1, // Take up remaining space
    marginLeft: 10,
    marginRight: 10,
  },
  navItem: {
    backgroundColor: "black",
    color: "white",
  },
});

export default MainHeader;
