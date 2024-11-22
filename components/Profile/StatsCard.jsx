import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const StatsCard = ({ title, time, handlePress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.innerCard}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 5px 0px rgb(0,0,0)"
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
  },
  icon: {
    width: 50,
    height: 50
  }
});

export default StatsCard;
