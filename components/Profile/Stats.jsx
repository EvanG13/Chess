import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MainHeader from "../Main/MainHeader";
import StatsCard from "./StatsCard";
import ArchivedGamesContainer from "./ArchivedGamesContainer";

const Stats = ({ navigation }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);
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
    const userId = sessionStorage.getItem("userId");
    const getUserGames = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/archivedGames/${userId}`,
          {
            headers: {
              Authorization: token,
              userId: userId
            }
          }
        );
        console.log(response.data);
        //DEBUG:
        // setUserGames(response.data.games);
        setUserGames([{players: [{username: "cleve", color: "white", rating: 1230, isWinner: true }, {username: "evan", color: "black", rating: 969, isWinner:false }], created: "1/11/2022", reason: "forfeit", numMoves: 10},
          {players: [{username: "caimin", color: "white", rating: 1230, isWinner: false }, {username: "cleve", color: "black", rating: 1190, isWinner: false }], created: "1/10/2021", reason: "insufficient material", numMoves: 41}])
      } catch (err) { 
        console.log(err);
      }
    };

    const getUserData = async () => {
      setSessionToken(token);
      setUsername(username);
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/stats`, {
          headers: {
            Authorization: token,
            userId: userId
          }
        });

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
    getUserGames();
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
    <View>
      <MainHeader navigation={navigation} />
      <Text>User</Text>
      <Text>{username}</Text>
      {userData ? (
        <>
          <Text>Total Games won: {userData.totalWins}</Text>
          <Text>Total Games lost: {userData.totalLosses}</Text>
          <Text>Total Games drawn: {userData.totalDraws}</Text>
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
      <ArchivedGamesContainer games={userGames} playerUsername={sessionStorage.getItem("username")}/>
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
