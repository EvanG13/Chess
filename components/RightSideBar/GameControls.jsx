import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

const GameControls = ({ setPromptType, setPromptVisible }) => {
  const handleForfeit = () => {
    setPromptType("forfeit");
    setPromptVisible(true);
  };

  const handleOfferDraw = () => {
    setPromptType("offerDraw");
    setPromptVisible(true);
  };

  return (
    <View style={styles.gameControls}>
      <Pressable style={styles.controlButton} onPress={handleForfeit}>
        <Text style={styles.buttonText}>Forfeit</Text>
      </Pressable>
      <Pressable style={styles.controlButton} onPress={handleOfferDraw}>
        <Text style={styles.buttonText}>Offer Draw</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gameControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "black",
    height: "5%",
    width: "100"
  },

  controlButton: {
    width: "40%",
    backgroundColor: "black",
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    height: "80%",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12
  }
});

export default GameControls;
