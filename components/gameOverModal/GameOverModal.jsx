import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { EmitActions } from "../../types/Actions.js";
import styles from "../PromptModal/PromptModalStyles.js";

const GameOverModal = ({ isVisible, setIsVisible, message, socket, navigation, timeControl }) => {
  const handleRematch = () => {};

  const handleNewGame = () => {
    navigation.replace("onlineGame", { timeControl });
  };

  if (!isVisible) return null;

  return (
    <View style={styles.modalContainer}>
      <SafeAreaView style={styles.modal}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsVisible(false)}
        >
          <Text>X</Text>
        </TouchableOpacity>
        <Text style={styles.messageText}>{message}</Text>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={handleRematch}>
            <Text style={styles.buttonText}>Rematch</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNewGame}>
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GameOverModal;
