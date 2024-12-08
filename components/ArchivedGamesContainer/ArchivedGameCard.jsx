import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ArchivedGameCard = ({ navigation, game, playerUsername }) => {
  let result = "draw";
  let player =
    game.players[0].username === playerUsername
      ? game.players[0]
      : game.players[1];
  if (
    game.resultReason !== "CHECKMATE" &&
    game.resultReason !== "TIMEOUT" &&
    game.resultReason !== "FORFEIT"
  ) {
    result = "draw";
  } else {
    if (player.isWinner) result = "win";
    else {
      result = "loss";
    }
  }

  const opponentPlayerData =
    game.players[0].username === playerUsername
      ? game.players[1]
      : game.players[0];

  const reviewGame = () => {
    navigation.navigate("reviewGame", { gameId: game.id });
  };

  return (
    <Pressable style={styles.archivedCard} onPress={reviewGame}>
      <View style={styles.playersBox}>
        <PlayerInfoRow
          isWhite={opponentPlayerData.isWhite}
          username={opponentPlayerData.username}
          rating={opponentPlayerData.rating}
          key={opponentPlayerData.username}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.resultAndNumMoves}>
          <Text style={styles.text}>{result}</Text>
          <Text style={styles.text}>{game.numMoves}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const PlayerInfoRow = ({ timeControl, username, rating }) => {
  return (
    <View style={styles.playerRow}>
      {(timeControl === "BULLET_1" || "BULLET_3") && (
        <MaterialCommunityIcons name="bullet" size={30} color="yellow" />
      )}
      {timeControl === "BLITZ_5" && (
        <FontAwesome name="bolt" size={30} color="yellow" />
      )}
      <Text style={styles.text}>{username}</Text>
      <Text style={styles.text}>{`(${rating})`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  archivedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 2,
    marginBottom: 2,
    alignItems: "center",
    backgroundColor: "#121212"
  },
  text: {
    color: "white"
  },
  container: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  resultAndNumMoves: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginLeft: 5,
    gap: 50
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 7,
    gap: 10
  },
  playersBox: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

export default ArchivedGameCard;
