import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const StatsCard = ({ title, iconPath, handlePress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
      <Image source={iconPath} style={styles.icon} />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0)"
  },
  cardHover: {
    boxShadow: "0px 0px 10px 0px rgba(0,0,0)"
  },

  title: {
    fontSize: 20
  },
  icon: {
    width: 50,
    height: 50
  }
});

export default StatsCard;
