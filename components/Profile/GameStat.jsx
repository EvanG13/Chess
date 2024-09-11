import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";

const GameStat = ({ navigation }) => {
  const route = useRoute();
  const { timeControl } = route.params || {};
  const { gameStats, setGameStats } = useState(null); //object containing all game stats

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/user?userId=${sessionStorage.getItem("userId")}&timeControl=${timeControl}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("sessionToken")
            }
          }
        );
        setGameStats({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    };
    if (!sessionStorage.getItem("sessionToken")) {
      navigation.navigate("login");
      return;
    }
    getData();
  }, []);
  return (
    <div>
      <h1>{timeControl}</h1>
      <p>Wins: 0</p>
      <p>Losses: 0</p>
    </div>
  );
};

export default GameStat;
