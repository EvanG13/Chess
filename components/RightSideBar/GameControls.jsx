import react from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { EmitActions } from "../../types/Actions";

const GameControls = ({ socket }) => {
  const handleForfeit = () => {
    console.log("in handle forfeit");
    //TODO open modal to confirm that user wants to forfeit
    socket.sendMessage({
      action: EmitActions.FORFEIT,
      gameId: sessionStorage.getItem("gameId")
    });
  };

  const handleOfferDraw = () => {
    //TODO open modal to confirm that user wants to offer a draw. The modal should be the one resonsible for the socket
    socket.sendMessage({
      action: EmitActions.OFFER_DRAW,
      gameId: sessionStorage.getItem("gameId")
    });
  };

  return (
    <View style={styles.gameControls}>
      <TouchableOpacity style={styles.controlButton} onPress={handleForfeit}>
        <Text style={styles.buttonText}>Forfeit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={handleOfferDraw}>
        <Text style={styles.buttonText}>OfferDraw</Text>
      </TouchableOpacity>
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
    width: "30%",
    backgroundColor: "green",
    color: "white"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});

export default GameControls;
