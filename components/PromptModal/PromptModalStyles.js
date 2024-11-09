import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    modalContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    modal: {
      width: "90%",
      height: "50%",
      backgroundColor: "white",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    closeButton: {
        position: "absolute", 
        top: 10, 
        right: 10, 
        backgroundColor: "white",
        padding: 10,
        zIndex: 20, 
      },
    messageText: {
      color: "black",
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
    },
    buttonText: {
      color: "black",
      textAlign: "center",
      fontSize: 14,
      padding: 10,
    },

    buttonBox: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
  });
  
  export default styles;