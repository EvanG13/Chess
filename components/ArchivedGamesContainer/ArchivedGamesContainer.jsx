import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/services/axios/axiosInstance";
import ArchivedGameCard from "@/components/ArchivedGamesContainer/ArchivedGameCard";

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

const styles = StyleSheet.create({
  archivedContainer: {
    width: "100%",
    flexDirection: "column"
  }
});

export default ArchivedGamesContainer;
