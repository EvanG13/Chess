import { View, TouchableOpacity, StyleSheet, Text } from "react-native";


const GameControls = ({ socket, setPromptType, setPromptVisible }) => {   
  const handleForfeit = () => {
    console.log("in handle forfeit");
   
    setPromptType("forfeit");
    setPromptVisible(true);
  };

  const handleOfferDraw = () => {
    setPromptType("offerDraw");
    setPromptVisible(true);
  };

  return (
    <View style={styles.gameControls}>
      <TouchableOpacity style={styles.controlButton} onPress={handleForfeit}>
        <Text style={styles.buttonText}>Forfeit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={handleOfferDraw}>
        <Text style={styles.buttonText}>Offer Draw</Text>
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
