import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MainHeader from "../Main/MainHeader";
import StatsCard from "./StatsCard";
import Chat from "../Chat/Chat";

const Stats = ({ navigation }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const timeControls = [
    {
      title: "Bullet 1",
      iconPath: require("../../assets/appImages/bullet.png")
    },
    { title: "Blitz 3", iconPath: require("../../assets/appImages/blitz.png") },
    { title: "Blitz 5", iconPath: require("../../assets/appImages/blitz.png") },
    {
      title: "Rapid 10",
      iconPath: require("../../assets/appImages/rapid.png")
    },
    {
      title: "Classical 30",
      iconPath: require("../../assets/appImages/classical.jpg")
    }
  ];
  useEffect(() => {
    const getUserData = async () => {
      const token = sessionStorage.getItem("sessionToken");
      const userId = sessionStorage.getItem("userId");
      setSessionToken(token);
      setUsername(username);

      console.log(token + " " + token);
      try {
        const response = await axios.post(
          `${BACKEND_BASE_URL}/stats`,
          {}, // Pass an empty object if there's no data to send in the body
          {
            headers: {
              Authorization: token,
              userId: userId
            }
          }
        );

        const userData = response.data;
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };
    if (!sessionStorage.getItem("sessionToken")) {
      navigation.navigate("login");
      return;
    }
    getUserData();
  }, [navigation]);

  return (
    <View>
      <MainHeader navigation={navigation} />
      <Text>User</Text>
      <Text>{username}</Text>
      {userData ? (
        <>
          <Text>Games won: {userData.gamesWon}</Text>
          <Text>Games lost: {userData.gamesLost}</Text>
          <Text>Games drawn: {userData.gamesDrawn}</Text>`
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      <View style={styles.statCards}>
        {timeControls.map((control, index) => {
          return (
            <StatsCard
              key={index}
              title={control.title}
              iconPath={control.iconPath}
              handlePress={() =>
                navigation.navigate("stats", { timeControl: control.title })
              }
            />
          );
        })}
      </View>
      <Chat />
    </View>
  );
};

const styles = StyleSheet.create({
  statCards: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "50%",
    margin: "auto"
  }
});

export default Stats;
