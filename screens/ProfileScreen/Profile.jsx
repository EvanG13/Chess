import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import Header from "@/components/Header/Header";
import axiosInstance from "@/services/axios/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import TimeCategoryRecordCards from "@/components/TimeCategoryRecordCards/TimeCategoryRecordCards";
import ArchivedGamesContainer from "@/components/ArchivedGamesContainer/ArchivedGamesContainer";
import styles from "./profileStyling"
import StatsCard from "@/components/StatsCard/StatsCard";

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
    <SafeAreaView style={styles.stats}>
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
                    timeControl: control.officialTitle,
                    title: control.title,
                    username: username
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
          <TimeCategoryRecordCards
            wins={userData.totalWins}
            draws={userData.totalDraws}
            losses={userData.totalLosses}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.main}>
        <GamesHeader />

        <ArchivedGamesContainer
          navigation={navigation}
          playerUsername={username}
        />
      </View>
    </SafeAreaView>
  );
};

const GamesHeader = () => {
  return (
    <View style={styles.gameHeader}>
      <Text style={styles.gameHeaderText}>Opponent</Text>
      <View style={styles.resultAndMoves}>
        <Text style={styles.gameHeaderText}>Result</Text>
        <Text style={styles.gameHeaderText}>Moves</Text>
      </View>
    </View>
  );
};


export default Profile;
