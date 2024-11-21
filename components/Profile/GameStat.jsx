import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import axiosInstance from "../axiosInstance";
import React, { useState, useEffect } from "react";
import ArchivedGamesContainer from "./ArchivedGamesContainer";
import styles from "./GameStatStyles";

const GameStat = ({ navigation }) => {
  const route = useRoute();
  const { timeControl } = route.params || {};
  const [gameStats, setGameStats] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let userData = null;
      try {
        const response = await axiosInstance.get(`/stats`);

        userData = response.data;
        userData = userData[timeControl.split(" ")[0].toLowerCase()];

        console.log(userData);
      } catch (error) {
        console.log(error);
      }
      setGameStats({ ...userData });
    };
    if (!sessionStorage.getItem("sessionToken")) {
      navigation.navigate("login");
      return;
    }
    getData();
  }, []);
  return (
    <View style={styles.GameStat}>
      <Text style={styles.timeControlTitle}>{timeControl}</Text>
      {gameStats ? (
        <View style={styles.diagnostics}>
          <Text style={styles.diagnosticsText}>Wins: {gameStats.wins}</Text>
          <Text style={styles.diagnosticsText}>Losses: {gameStats.losses}</Text>
          <Text style={styles.diagnosticsText}>Draws: {gameStats.draws}</Text>
          <Text style={styles.diagnosticsText}>Rating: {gameStats.rating}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <ArchivedGamesContainer
        playerUsername={sessionStorage.getItem("username")}
        timeControl={timeControl}
      />
    </View>
  );
};

export default GameStat;
