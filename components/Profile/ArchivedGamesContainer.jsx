import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ArchivedGameCard from "./ArchivedGameCard";
import SortCriteria from "../../types/SortCriteria";
import axiosInstance from "../axiosInstance";

const ArchivedGamesContainer = ({ playerUsername, timeControl }) => {
  const [sortCriteria, setSortCriteria] = useState(SortCriteria.DESCENDING);
  const [archivedGames, setArchivedGames] = useState([]);
  // useEffect(() => {
  //   let sortedGames = [...archivedGames];
  //   if (sortCriteria === SortCriteria.DESCENDING)
  //     sortedGames.sort(
  //       (game, game2) => new Date(game.created) - new Date(game2.created)
  //     );
  //   else
  //     sortedGames.sort(
  //       (game, game2) => new Date(game2.created) - new Date(game.created)
  //     );
  //   setArchivedGames(sortedGames);
  // }, [sortCriteria, archivedGames]);

  useEffect(() => {
    const token = sessionStorage.getItem("sessionToken");
    const userId = sessionStorage.getItem("userId");

    const getUserGames = async () => {
      try {
        let path = `/archivedGames/${userId}`;
        if (timeControl) {
          path = `/archivedGames/${userId}?timeControl=${timeControl}`;
        }

        const response = await axiosInstance.get(path, {
          headers: {
            Authorization: token,
            userId: userId
          }
        });
        console.log(response.data);
        //DEBUG:
        // setArchivedGames(response.data.archivedGames);
        setArchivedGames([
          {
            resultReason: "CHECKMATE",
            numMoves: 15,
            timeControl: "BLITZ_5",
            created: "Oct 12, 2023, 12:13:45 AM",
            players: [
              {
                isWinner: true,
                playerId: "id1",
                username: "user1",
                isWhite: false,
                rating: 1200
              },
              {
                isWinner: false,
                playerId: "id2",
                username: "user2",
                isWhite: true,
                rating: 1120
              }
            ],
            id: "670a21a9e135ae2f48a25c00"
          },
          {
            resultReason: "ABORTED",
            numMoves: 26,
            timeControl: "BULLET_1",
            created: "Oct 12, 2024, 12:13:45 AM",
            players: [
              {
                isWinner: false,
                playerId: "id1",
                username: "user1",
                isWhite: true,
                rating: 1604
              },
              {
                isWinner: true,
                playerId: "id2",
                username: "user2",
                isWhite: false,
                rating: 120
              }
            ],
            id: "670a21a9e135ae2f48a25c06"
          }
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    getUserGames();
  }, []);

  return (
    <View style={styles.archivedContainer}>
      <GamesHeader
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <View>
        {archivedGames.map((game, index) => {
          return (
            <ArchivedGameCard
              game={game}
              key={`archivedGame-${index}`}
              playerUsername={playerUsername}
            />
          );
        })}
      </View>
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
    height: "80%",
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
