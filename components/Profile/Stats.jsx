import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MainHeader from "../Main/MainHeader";
import StatsCard from "./StatsCard";
import ArchivedGamesContainer from "./ArchivedGamesContainer";
import LinearGradient from "react-native-web-linear-gradient";

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
        // setUserGames(response.data.archivedGames);
        setUserGames([
          {
            resultReason: "CHECKMATE",
            numMoves: 15,
            timeControl: "BLITZ_5",
            created: "Oct 12, 2023, 12:13:45 AM",
            players: [
              { isWinner: true, playerId: "id1", username: "user1", isWhite: false, rating: 1200 },
              { isWinner: false, playerId: "id2", username: "user2", isWhite: true, rating: 1120 }
            ],
            id: "670a21a9e135ae2f48a25c00"
          },
          {
            resultReason: "ABORTED",
            numMoves: 26,
            timeControl: "BULLET_1",
            created: "Oct 12, 2024, 12:13:45 AM",
            players: [
              { isWinner: false, playerId: "id1", username: "user1", isWhite: true, rating: 1604 },
              { isWinner: true, playerId: "id2", username: "user2", isWhite: false, rating: 120 }
            ],
            id: "670a21a9e135ae2f48a25c06"
          }
        ]);
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
    <View style={styles.stats}>
      <MainHeader navigation={navigation} />
      <Text style={styles.usernameHeader}>{sessionStorage.getItem("username")}</Text>
      <Text>{username}</Text>
      {userData ? (
         <LinearGradient
         start={{x: 0, y: 0}} end={{x: 1, y: 0}}
         colors={['#000000', '#008000']}  // Black to Green
         style={styles.gradient}
       >
        <View style={styles.rawStats}>
          <Text style={styles.statText}>Total Games won: {userData.totalWins}</Text>
          <Text style={styles.statText}>Total Games lost: {userData.totalLosses}</Text>
          <Text style={styles.statText}>Total Games drawn: {userData.totalDraws}</Text>
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
        games={userGames}
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
    justifyContent: "space-between",
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
  },
  usernameHeader: {
    textAlign: "left",
    margin: 10,
    fontSize: 35,
    color: "white"
  }
});

export default Stats;
