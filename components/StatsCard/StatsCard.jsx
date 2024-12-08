import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./statsCardStyling"

const StatsCard = ({
  title,
  time,
  handlePress,
  cardStyle,
  timeStyle,
  titleStyle
}) => {
  return (
    <Pressable style={[styles.card, cardStyle]} onPress={handlePress}>
      <View style={styles.innerCard}>
        <Text style={[styles.time, timeStyle]}>{time}</Text>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default StatsCard;
