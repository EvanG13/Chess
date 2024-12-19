import React from "react";

import { View } from "react-native";
import StatsCard from "@/components/StatsCard/StatsCard";
import styles from "./playGameOptionsStyles";

const PlayGameOptions = ({ navigation }) => {
  const timeControls = [
    {
      title: "Bullet",
      timeControl: {
        base: 60,
        increment: 0
      },
      time: "1+0"
    },
    {
      title: "Bullet",
      timeControl: {
        base: 180,
        increment: 0
      },
      time: "3+0"
    },
    {
      title: "Blitz",
      timeControl: {
        base: 300,
        increment: 0
      },
      time: "5+0"
    },
    {
      title: "Rapid",
      timeControl: {
        base: 600,
        increment: 0
      },
      time: "10+0"
    }
  ];

  const handlePress = (timeControl) => {
    navigation.navigate("onlineGame", { timeControl });
  };

  return (
    <View>
      <View style={styles.cardContainer}>
        {timeControls.map((control, index) => {
          return (
            <StatsCard
              key={index}
              title={control.title}
              time={control.time}
              navigate={navigation.navigate}
              handlePress={() => handlePress(control.timeControl)}
              titleStyle={styles.titleStyles}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PlayGameOptions;
