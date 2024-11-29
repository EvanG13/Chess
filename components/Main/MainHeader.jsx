import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import logo from "../../assets/appImages/logo.png";
import { useIsFocused } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";
import * as SecureStore from "expo-secure-store";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";

const MainHeader = ({ navigation }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [username, setUsername] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const token = await SecureStore.getItemAsync("sessionToken");
        const username = await SecureStore.getItemAsync("username");
        setSessionToken(token);
        setUsername(username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCredentials();
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("sessionToken");
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("userId");
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    }

    setSessionToken(null);
    setUsername(null);
    navigation.navigate("login");
  };

  const performOption = (option) => {
    if (option === "logout") {
      handleLogout();
    } else if (option === "profile") {
      navigation.navigate("profile");
    }
  };

  return (
    <View style={styles.mainHeader}>
      <View style={styles.paddingLeft}></View>
      <View style={styles.navBar}>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Chess");
          }}
        >
          <Text style={styles.texts}>Home</Text>
        </Pressable>
        {sessionToken ? (
          <>
            <Dropdown
              style={styles.dropdown}
              data={[
                { label: "Profile", value: "profile" },
                { label: "Logout", value: "logout" }
              ]}
              labelField="label"
              valueField="value"
              placeholder={username}
              placeholderStyle={styles.placeholderStyle}
              onChange={(item) => {
                performOption(item.value);
              }}
              renderRightIcon={() => (
                <Icon name="user-circle-o" size={30} color="white" />
              )}
            />
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
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%"
  },
  navItem: {
    backgroundColor: "green",
    marginTop: 40
  },
  texts: {
    color: "white",
    fontSize: 20
  },
  dropdownContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  dropdown: {
    marginTop: 40,
    width: "40%",
    fontSize: 20
  },
  placeholderStyle: {
    color: "white"
  }
});

export default MainHeader;
