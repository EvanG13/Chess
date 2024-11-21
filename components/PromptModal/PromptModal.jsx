import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import styles from "./PromptModalStyles.js";
import handlers from "./handlers.js";

const PromptModal = ({ isVisible, setIsVisible, type, socket }) => {
  let message;
  let splitType = type.split(" ");
  type = splitType[0];

  let fromTo = type === "promote" ? splitType[1] : null;

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
    case "promote":
      message = "Promote pawn to:";
      break;

    default:
      message = "ERROR: Invalid type";
  }

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
            onPress={() => {
              if (type === "offerDraw") {
                handlers.handleConfirmDraw(socket);
              } else if (type === "acceptDraw") {
                handlers.handleAcceptDraw(socket);
              } else if (type === "forfeit") {
                handlers.handleConfirmForfeit(socket);
              } else {
                handlers.handlePromote(socket, "q", fromTo);
              }

              setIsVisible(false);
            }}
          >
            <Text style={styles.buttonText}>
              {type === "forfeit" || type === "offerDraw"
                ? "Confirm"
                : type === "acceptDraw"
                  ? "Accept"
                  : "Queen"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (type === "acceptDraw") {
                handlers.handleDeclineDraw(socket);
              } else if (type === "forfeit") {
                handlers.handleCancelForfeit(socket);
              } else {
                handlers.handlePromote(socket, "n", fromTo);
              }

              setIsVisible(false);
            }}
          >
            <Text style={styles.buttonText}>
              {type === "forfeit" || type === "offerDraw"
                ? "Cancel"
                : type === "acceptDraw"
                  ? "Decline"
                  : "Knight"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PromptModal;
