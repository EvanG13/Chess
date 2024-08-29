import React, {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_BASE_URL} from "@env";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const User = ({navigate}) => {
    const [sessionToken, setSessionToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);

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
    }, [navigate]);
    
    
    
    return (
        <View>
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

            
        </View>
    );
}

export default User;