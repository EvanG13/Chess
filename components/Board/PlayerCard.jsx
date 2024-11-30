import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlayerCard = ({ player }) => {
  return (
    <View style={styles.playerCard}>
      <Text style={styles.playerName}>{player.name}</Text>
      <Text style={styles.playerRating}>{player.rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerCard: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    height: 50,
    width: "100%"
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  playerRating: {
    fontSize: 16,
    color: "white"
  }
});

export default PlayerCard;
