import { View, Text, Pressable, SafeAreaView } from "react-native";
import styles from "@/components/PromptModal/promptModalStyles.js";

const GameOverModal = ({
  isVisible,
  setIsVisible,
  message,
  socket,
  navigation,
  timeControl
}) => {
  const handleRematch = () => {};

  const handleNewGame = () => {
    navigation.replace("onlineGame", { timeControl });
  };

  if (!isVisible) return null;

  return (
    <View style={styles.modalContainer}>
      <SafeAreaView style={styles.modal}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setIsVisible(false)}
        >
          <Text>X</Text>
        </Pressable>
        <Text style={styles.messageText}>{message}</Text>
        <View style={styles.buttonBox}>
          <Pressable onPress={handleRematch}>
            <Text style={styles.buttonText}>Rematch</Text>
          </Pressable>
          <Pressable onPress={handleNewGame}>
            <Text style={styles.buttonText}>New Game</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GameOverModal;
