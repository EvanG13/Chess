import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import axiosInstance from "../axiosInstance";
import React, { useState, useEffect } from "react";
import ArchivedGamesContainer from "./ArchivedGamesContainer";

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
    <View>
      {gameStats ? (
        <View>
          <Text>{timeControl}</Text>
          <Text>Wins: {gameStats.wins}</Text>
          <Text>Losses: {gameStats.losses}</Text>
          <Text>Draws: {gameStats.draws}</Text>
          <Text>Rating: {gameStats.rating}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <ArchivedGamesContainer navigation={navigation} />
    </View>
  );
};

export default GameStat;
