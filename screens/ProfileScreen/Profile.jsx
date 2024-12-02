import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../components/axiosInstance";
import { View, StyleSheet, Text } from "react-native";
import StatsCard from "./StatsCard";
import ArchivedGamesContainer from "./ArchivedGamesContainer";
import * as SecureStore from "expo-secure-store";
import Header from "../../components/Header/Header";
// TODO : put ratings in stats statscard

const Profile = ({ navigation }) => {
  const route = useRoute();
  const { username } = route.params;
  const [userData, setUserData] = useState(null);
  const timeControls = [
    {
      title: "Bullet",
      time: "1+0",
      officialTitle: "BULLET_1"
    },
    { title: "Blitz", time: "5+0", officialTitle: "BLITZ_5" },
    {
      title: "Rapid",
      time: "10+0",
      officialTitle: "RAPID_10"
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
        const response = await axiosInstance.get(`/stats/${username}`);
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
      <Header navigation={navigation} />
      <View styles={styles.secondaryHeader}>
        <Text style={styles.usernameHeader}>{username}</Text>
        <View style={styles.statCards}>
          {timeControls.map((control, index) => {
            return (
              <StatsCard
                key={index}
                title={control.title}
                time={control.time}
                handlePress={() =>
                  navigation.navigate("stats", {
                    timeControl: control.officialTitle
                  })
                }
                cardStyle={styles.cardStyle}
                timeStyle={styles.timeStyle}
                titleStyle={styles.titleStyle}
              />
            );
          })}
        </View>

        {userData ? (
          <View style={styles.rawStats}>
            <Text style={styles.statText}>Win: {userData.totalWins}</Text>
            <Text style={styles.statText}>Loss: {userData.totalLosses}</Text>
            <Text style={styles.statText}>Draw: {userData.totalDraws}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.main}>
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
    justifyContent: "space-between",
    marginLeft: 10,
    width: "90%"
  },
  statText: {
    color: "white",
    fontSize: 18
  },
  statCards: {
    flexDirection: "row"
  },
  usernameHeader: {
    textAlign: "left",
    margin: 10,
    fontSize: 20,
    color: "white"
  },
  cardStyle: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  timeStyle: {
    display: "none"
  },
  titleStyle: {
    fontSize: 10,
    fontWeight: "bold"
  },
  secondaryHeader: {
    flexDirection: "column",
    width: "80%"
  }
});

export default Profile;
