import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { View, StyleSheet, Text } from "react-native";
import MainHeader from "../Main/MainHeader";
import StatsCard from "./StatsCard";
import ArchivedGamesContainer from "./ArchivedGamesContainer";
import LinearGradient from "react-native-web-linear-gradient";
import * as SecureStore from "expo-secure-store";

const Stats = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const timeControls = [
    {
      title: "Bullet",
      time: "1+0"
    },
    { title: "Blitz", time: "3+0" },
    { title: "Blitz", time: "5+0" },
    {
      title: "Rapid 10",
      time: "10+0"
    }
  ];

  useEffect(() => {
    const getUserData = async () => {
      const token = await SecureStore.getItemAsync("sessionToken");
      if (!token) {
        navigation.navigate("login");
        return;
      }

      try {
        setUsername(await SecureStore.getItemAsync("username"));

        const response = await axiosInstance.get("/stats");
        const userData = response.data;

        setTotals(userData);
      } catch (error) {
        console.error(error);
      }
    };

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
      <Text style={styles.usernameHeader}>{username}</Text>
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
                time={control.time}
                handlePress={() =>
                  navigation.navigate("stats", { timeControl: control.title })
                }
              />
            );
          })}
        </View>
        <ArchivedGamesContainer
          navigation={navigation}
          playerUsername={username}
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
    width: "30%",
    height: "50%",
    padding: 10,
    marginLeft: "5%"
  },
  usernameHeader: {
    textAlign: "left",
    margin: 10,
    fontSize: 35,
    color: "white"
  }
});

export default Stats;
