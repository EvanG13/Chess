import React, {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_BASE_URL} from "@env";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MainHeader from "../Main/MainHeader";
import StatsCard from "./StatsCard";

const Stats = ({navigation}) => {
    const [sessionToken, setSessionToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);
    const timeControls = [
        {title: "Bullet 1", iconPath: require("../../assets/appImages/bullet.png")},
        {title: "Blitz 3", iconPath: require("../../assets/appImages/blitz.png")},
        {title: "Blitz 5", iconPath: require("../../assets/appImages/blitz.png")},
        {title: "Rapid 10", iconPath: require("../../assets/appImages/rapid.png")},
        {title: "Classical 30", iconPath: require("../../assets/appImages/classical.jpg")}
    ];
    useEffect(() => {

        const getUserData = async () => {
            const token = sessionStorage.getItem("sessionToken");
            const username = sessionStorage.getItem("username");
            setSessionToken(token);
            setUsername(username);
            try{
            const response = await axios.get(`${BACKEND_BASE_URL}/user`, {
                headers: {
                    Authorization: token
                }
            });
            setUserData({...response.data});
        } catch (error) { console.log(error); }
    };
        getUserData();
    }, [navigation]);
    
    
    
    return (
        <View>
            <MainHeader navigation={navigation}/>
            <Text>User</Text>
            <Text>{username}</Text>
            {userData ? ( <>
                <Text>Games won: {userData.gamesWon}</Text>
                <Text>Games lost: {userData.gamesLost}</Text>
                <Text>Games drawn: {userData.gamesDrawn}</Text>`
            </>
        ) 
        :
        
            <Text>Loading...</Text>    
        }

            <View style={styles.statCards}>
                {timeControls.map((control, index) => {
                    return (
                        <StatsCard key={index}
                         title={control.title}
                         iconPath={control.iconPath}
                         navigate={navigation.navigate}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statCards: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "50%",
        margin: "auto"
    }
});

export default Stats;