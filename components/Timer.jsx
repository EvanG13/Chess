import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ timeRemaining, isWhiteTurn, isWhite }) => {
  const [seconds, setSeconds] = useState(timeRemaining);

  useEffect(() => {
    let interval;
    if ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn)) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isWhiteTurn]);

  const formatTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    height: "50%",
    backgroundColor: "yellow",
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  timerText: {
    color: "black",
  }
});

export default Timer;
