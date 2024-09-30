import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PlayerCard = ({ player }) => {
  return (
    <View style={styles.playerCard}>
      {/* <Image source={{ uri: player.avatar }} style={styles.playerAvatar} /> */}
      <Text style={styles.playerName}>{player.name}</Text>
      <Text style={styles.playerRating}>{player.rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerCard: {
    backgroundColor: "white",
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
    color: "black"
  },
  playerRating: {
    fontSize: 16,
    color: "#666"
  }
});

export default PlayerCard;
