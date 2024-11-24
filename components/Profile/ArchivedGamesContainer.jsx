import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import ArchivedGameCard from "./ArchivedGameCard";
import SortCriteria from "../../types/SortCriteria";
import axiosInstance from "../axiosInstance";

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
    const username = sessionStorage.getItem("username");

    const getUserGames = async () => {
      try {
        let path = `/archivedGames/${username}`;
        if (timeControl) {
          let format;
          let time;
          [format, time] = timeControl.split(" ");
          timeControl = `${format.toUpperCase()}_${time}`;

          path += `?timeControl=${timeControl}`;
        }

        const response = await axiosInstance.get(path);
        console.log(response.data);

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
        <TouchableOpacity onPress={handlePress}>
          <Text>{sortCriteria === SortCriteria.ASCENDING ? "⬇️" : "⬆️"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  archivedContainer: {
    width: "48%",
    height: "60%",
    marginLeft: "15%",
    marginRight: "15%",
    backgroundColor: "black",
    marginBottom: 20
  },
  gameHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 3
  },
  gameHeaderText: {
    fontSize: 20,
    color: "white"
  },
  dateAndSort: {
    width: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default ArchivedGamesContainer;
