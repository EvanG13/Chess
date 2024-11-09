import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { EmitActions } from "../../types/Actions";
import styles from "./PromptModalStyles.js";

const PromptModal = ({ isVisible, setIsVisible, type, socket }) => {
  let message;

  switch (type) {
    case "offerDraw":
      message = "Would you like to offer a draw?";
      break;
    case "acceptDraw":
      message = "Your opponent has offered a draw. Do you accept?";
      break;
    case "forfeit":
      message = "Are you sure you want to forfeit?";
      break;

    default:
      message = "ERROR: Invalid type";
  }

  const handleAcceptDraw = () => {
    socket.sendMessage({
      action: EmitActions.ACCEPT_DRAW,
      gameId: sessionStorage.getItem("gameId")
    });
    setIsVisible(false);
  };

  const handleConfirmDraw = () => {
    socket.sendMessage({
      action: EmitActions.OFFER_DRAW,
      gameId: sessionStorage.getItem("gameId")
    });
    setIsVisible(false);
  };

  const handleDeclineDraw = () => {
    socket.sendMessage({
      action: EmitActions.DECLINE_DRAW,
      gameId: sessionStorage.getItem("gameId")
    });
    setIsVisible(false);
  };

  const handleConfirmForfeit = () => {
    socket.sendMessage({
      action: EmitActions.FORFEIT,
      gameId: sessionStorage.getItem("gameId")
    });
    setIsVisible(false);
  };

  const handleCancelForfeit = () => {
    setIsVisible(false);
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
          <TouchableOpacity
            onPress={
              type === "offerDraw"
                ? handleConfirmDraw
                : type === "acceptDraw"
                  ? handleAcceptDraw
                  : handleConfirmForfeit
            }
          >
            <Text style={styles.buttonText}>
              {type === "forfeit" || type === "offerDraw"
                ? "Confirm"
                : "Accept"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              type === "acceptDraw" ? handleDeclineDraw : handleCancelForfeit
            }
          >
            <Text style={styles.buttonText}>
              {type === "forfeit" || type === "offerDraw"
                ? "Cancel"
                : "Decline"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PromptModal;
