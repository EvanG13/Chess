import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./TimerStyles";
import { formatTime } from "./algorithms";

const Timer = ({
  timeRemaining,
  isWhiteTurn,
  isWhite,
  setTimeRemaining,
  isGameOver
}) => {
  const [seconds, setSeconds] = useState(timeRemaining);

  useEffect(() => {
    if (isGameOver) {
      return;
    }
    let interval;
    if ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
          setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isWhiteTurn, isGameOver]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    </View>
  );
};

export default Timer;
