import React, { useEffect } from "react";

import { View, StyleSheet, Text } from "react-native";
import StatsCard from "../Profile/StatsCard";
// import { styles } from "../Profile/StatsCard";

const PlayGameOptions = ({ navigation }) => {

  const timeControls = [
    {
      title: "Bullet 1",
      requestTitle: "BULLET_1",
      iconPath: require("../../assets/appImages/bullet.png")
    },
    {
      title: "Bullet 3",
      requestTitle: "BULLET_3",
      iconPath: require("../../assets/appImages/bullet.png")
    },
    {
      title: "Blitz 5",
      requestTitle: "BLITZ_5",
      iconPath: require("../../assets/appImages/blitz.png")
    },
    {
      title: "Rapid 10",
      requestTitle: "BLITZ_10", //TODO this should be rapid 10 in the backend
      iconPath: require("../../assets/appImages/rapid.png")
    },
    {
      title: "Classical 30", //TODO this should be added as a time control in the backend
      requestTitle: "CLASSICAL_30",
      iconPath: require("../../assets/appImages/classical.jpg")
    }
  ];

  const handlePress = (requestTitle) => {
    console.log(requestTitle);
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
              iconPath={control.iconPath}
              navigate={navigation.navigate}
              handlePress={() => handlePress(control.requestTitle)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  }
});

export default PlayGameOptions;
