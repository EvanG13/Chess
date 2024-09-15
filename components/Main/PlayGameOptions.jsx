import React, { useEffect } from "react";

import { View, StyleSheet, Text } from "react-native";
import StatsCard from "../Profile/StatsCard";
import { styles } from "../Profile/StatsCard";
import createSocket from "../websocket";

const PlayGameOptions = () => {
  let socket;
  const requestTimeControls = {
    "Bullet 1": "BULLET_1",
    "Blitz 3": "BLITZ_3",
    "Blitz 5": "BLITZ_5",
    "Rapid 10": "RAPID_10",
    "Classical 30": "CLASSICAL_30"
  };
  const timeControls = [
    {
      title: "Bullet 1",
      requestTitle: "BULLET_1",
      iconPath: require("../../assets/appImages/bullet.png")
    },
    {
      title: "Bullet 3",
      requestTitle: "BULLET_3",
      iconPath: require("../../assets/appImages/blitz.png")
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

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, []);

  const handlePress = async (requestTitle) => {
    if (!socket ) {
      try {
        socket = await createSocket(
          sessionStorage.getItem("username") || "defaultUsername"
        );

        socket.onmessage = function (event) {
          console.log(event.data);
          //if its created
          //navigate to game screen
        };

        console.log(requestTitle, sessionStorage.getItem("userId"));
      } catch (error) {
        console.error("Error during joinGame:", error);
        return;
      }
    }
    socket.sendMessage({
      action: "joinGame",
      timeControl: requestTitle,
      userId: sessionStorage.getItem("userId")
    });
  };

  return (
    <View>
      <Text>Play Game Options</Text>
      <View style={styles.statCards}>
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

export default PlayGameOptions;
