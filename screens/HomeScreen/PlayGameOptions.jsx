import React from "react";

import { View } from "react-native";
import StatsCard from "@/components/StatsCard/StatsCard";
import styles from "./playGameOptionsStyles";

const PlayGameOptions = ({ navigation }) => {
  const timeControls = [
    {
      title: "Bullet",
      requestTitle: "BULLET_1",
      time: "1+0"
    },
    {
      title: "Bullet",
      requestTitle: "BULLET_3",
      time: "3+0"
    },
    {
      title: "Blitz",
      requestTitle: "BLITZ_5",
      time: "5+0"
    },
    {
      title: "Rapid",
      requestTitle: "BLITZ_10",
      time: "10+0"
    }
  ];

  const handlePress = (requestTitle) => {
    navigation.navigate("onlineGame", { timeControl: requestTitle });
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
              handlePress={() => handlePress(control.requestTitle)}
              titleStyle={styles.titleStyles}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PlayGameOptions;
