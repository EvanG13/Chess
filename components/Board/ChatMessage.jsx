import React from "react";

import { View, Text, StyleSheet } from "react-native";

const ChatMessage = ({messageObject}) =>{
    return (
        <View>
            <Text style={styles.message}>{messageObject.message}</Text>
        </View>
    );
    //TODO: add datetime stamp to the message
}

const styles = StyleSheet.create({
    message: {
    }
});

export default ChatMessage;