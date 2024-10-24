import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MainHeader from "../Main/MainHeader";
import StatsCard from "./StatsCard";
import ArchivedGamesContainer from "./ArchivedGamesContainer";
import LinearGradient from "react-native-web-linear-gradient";

const Stats = ({ navigation }) => {
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
    const token = sessionStorage.getItem("sessionToken");

    const getUserData = async () => {
      setUsername(username);
      try {
        const response = await axiosInstance.get(`/stats`);

        const userData = response.data;
        setTotals(userData);
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

  const setTotals = (data) => {
    if (data) {
      data.totalWins = data.blitz.wins + data.bullet.wins + data.rapid.wins;
      data.totalLosses =
        data.blitz.losses + data.bullet.losses + data.rapid.losses;
      data.totalDraws = data.blitz.draws + data.bullet.draws + data.rapid.draws;
      setUserData(data);
    } else {
      console.log("No data found");
    }
  };
  return (
    <View style={styles.stats}>
      <MainHeader navigation={navigation} />
      <Text style={styles.usernameHeader}>
        {sessionStorage.getItem("username")}
      </Text>
      <Text>{username}</Text>
      {userData ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#000000", "#008000"]} // Black to Green
          style={styles.gradient}
        >
          <View style={styles.rawStats}>
            <Text style={styles.statText}>
              Total Games won: {userData.totalWins}
            </Text>
            <Text style={styles.statText}>
              Total Games lost: {userData.totalLosses}
            </Text>
            <Text style={styles.statText}>
              Total Games drawn: {userData.totalDraws}
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.main}>
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
        <ArchivedGamesContainer
          playerUsername={sessionStorage.getItem("username")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    backgroundColor: "black",
    color: "white",
    height: "100%",
    width: "100%"
  },

  main: {
    flexDirection: "row",
    height: "80%",
    marginTop: "4%"
  },

  rawStats: {
    color: "white",
    flexDirection: "row",
    width: "40%",
    marginLeft: "50%",
    marginRight: "50%",
    alignItems: "center",
    justifyContent: "space-between"
  },

  statText: {
    color: "white",
    fontSize: 18
  },

  statCards: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "30%"
  },
  usernameHeader: {
    textAlign: "left",
    margin: 10,
    fontSize: 35,
    color: "white"
  }
});

export default Stats;
