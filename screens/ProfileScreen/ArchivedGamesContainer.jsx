import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ArchivedGameCard from "./ArchivedGameCard";
import axiosInstance from "@/services/axios/axiosInstance";

const ArchivedGamesContainer = ({
  navigation,
  playerUsername,
  timeControl
}) => {
  const [archivedGames, setArchivedGames] = useState([]);

  useEffect(() => {
    const getUserGames = async () => {
      try {
        let path = `/archivedGames/${playerUsername}`;
        if (timeControl) {
          path += `?timeControl=${timeControl}`;
        }

        const response = await axiosInstance.get(path);

        setArchivedGames([...response.data.archivedGames]);
      } catch (err) {
        console.log(err);
      }
    };

    getUserGames();
  }, [playerUsername, timeControl]);

  if (archivedGames.length === 0)
    return (
      <Text style={{ color: "white", textAlign: "center", margin: 50 }}>
        No games found
      </Text>
    );

  return (
    <View style={styles.archivedContainer}>
      <GamesHeader />

      <ScrollView>
        {archivedGames.map((game, index) => {
          return (
            <ArchivedGameCard
              navigation={navigation}
              game={game}
              key={index}
              cardNumber={index}
              playerUsername={playerUsername}
            />
          );
        })}
      </ScrollView>
    </View>
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

const styles = StyleSheet.create({
  archivedContainer: {
    width: "100%",
    height: "60%",
    flexDirection: "column",
    marginBottom: 20
  },
  gameHeader: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    marginLeft: 10
  },
  gameHeaderText: {
    fontSize: 20,
    color: "white"
  },
  dateAndSort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  resultAndMoves: {
    flexDirection: "row",
    gap: 15
  }
});

export default ArchivedGamesContainer;
