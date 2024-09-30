import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_BASE_URL } from "@env";

const GameStat = ({ navigation }) => {
  const route = useRoute();
  const { timeControl } = route.params || {};
  const [gameStats, setGameStats] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let userData = null;
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/stats`, {
          headers: {
            Authorization: sessionStorage.getItem("sessionToken"),
            userId: sessionStorage.getItem("userId")
          }
        });

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
    </View>
  );
};

export default GameStat;
