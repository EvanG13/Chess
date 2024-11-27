import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ArchivedGameCard from "./ArchivedGameCard";
import SortCriteria from "../../types/SortCriteria";
import axiosInstance from "../axiosInstance";
import * as SecureStore from "expo-secure-store";

const ArchivedGamesContainer = ({
  navigation,
  playerUsername,
  timeControl
}) => {
  const [sortCriteria, setSortCriteria] = useState(SortCriteria.DESCENDING);
  const [archivedGames, setArchivedGames] = useState([]);

  useEffect(() => {
    let sortedGames = [...archivedGames];
    if (sortCriteria === SortCriteria.DESCENDING)
      sortedGames.sort(
        (game, game2) => new Date(game.created) - new Date(game2.created)
      );
    else
      sortedGames.sort(
        (game, game2) => new Date(game2.created) - new Date(game.created)
      );
    setArchivedGames(sortedGames);
  }, [sortCriteria]);

  useEffect(() => {
    const getUserGames = async () => {
      try {
        const username = await SecureStore.getItemAsync("username");

        let path = `/archivedGames/${username}`;
        if (timeControl) {
          let format;
          let time;
          [format, time] = timeControl.split(" ");
          timeControl = `${format.toUpperCase()}_${time}`;

          path += `?timeControl=${timeControl}`;
        }

        const response = await axiosInstance.get(path);

        setArchivedGames([...response.data.archivedGames]);
      } catch (err) {
        console.log(err);
      }
    };

    getUserGames();
  }, []);

  if (archivedGames.length === 0)
    return (
      <Text style={{ color: "white", textAlign: "center", margin: 50 }}>
        No games found
      </Text>
    );

  return (
    <View style={styles.archivedContainer}>
      <GamesHeader
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />

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

const GamesHeader = ({ sortCriteria, setSortCriteria }) => {
  const handlePress = () => {
    if (sortCriteria === SortCriteria.ASCENDING) {
      setSortCriteria(SortCriteria.DESCENDING);
    } else {
      setSortCriteria(SortCriteria.ASCENDING);
    }
  };

  return (
    <View style={styles.gameHeader}>
      <Text style={styles.gameHeaderText}>Players</Text>
      <Text style={styles.gameHeaderText}>Result</Text>
      <Text style={styles.gameHeaderText}>Moves</Text>
      <View style={styles.dateAndSort}>
        <Text style={styles.gameHeaderText}>Date</Text>
        <Pressable onPress={handlePress}>
          <Text>{sortCriteria === SortCriteria.ASCENDING ? "⬇️" : "⬆️"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  archivedContainer: {
    width: "95%",
    height: "60%",
    marginLeft: 10,
    marginRight: "15%",
    backgroundColor: "black",
    flexDirection: "column",
    marginBottom: 20
  },
  gameHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3
  },
  gameHeaderText: {
    fontSize: 20,
    color: "white"
  },
  dateAndSort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  }
});

export default ArchivedGamesContainer;
