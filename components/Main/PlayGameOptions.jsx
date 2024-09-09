import React from "react";
import { Text } from "react-native-web";
import { View, StyleSheet } from "react-native";
import StatsCard from "../Profile/StatsCard";
import {styles} from "../Profile/StatsCard";
const PlayGameOptions = () =>{
    const timeControls = [
        {title: "Bullet 1", iconPath: require("../../assets/appImages/bullet.png")},
        {title: "Blitz 3", iconPath: require("../../assets/appImages/blitz.png")},
        {title: "Blitz 5", iconPath: require("../../assets/appImages/blitz.png")},
        {title: "Rapid 10", iconPath: require("../../assets/appImages/rapid.png")},
        {title: "Classical 30", iconPath: require("../../assets/appImages/classical.jpg")}
    ];



    const handlePress =  async (title) => {
        //send a websocket request with he joinGame action 
        // {"action": "joinGame", "timeControl": title, "userId": sessionStorage.getItem("userId")}
        console.log("implement websocket request here");
    }
    return(
        <View>
            <Text>Play Game Options</Text>
            <View style={styles.statCards}>
                {timeControls.map((control, index) => {
                    return (
                        <StatsCard key={index}
                         title={control.title}
                         iconPath={control.iconPath}
                         navigate={navigation.navigate}
                         handlePress={handlePress}
                        />
                    );
                })}
            </View>
        </View>
    );
}



export default PlayGameOptions;