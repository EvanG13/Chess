import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

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

export const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  innerCard: {
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center"
  },
  cardHover: {
    boxShadow: "0px 0px 10px 0px rgb(0,0,0)"
  },
  time: {
    color: "black",
    fontSize: 30
  },
  title: {
    fontSize: 20,
    opacity: 0.85
  }
});

export default StatsCard;
