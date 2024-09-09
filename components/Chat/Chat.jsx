import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import createSocket, {closeSocket, sendMessage} from "../websocket";


const Chat = () =>{
    const [messageLog, setMessageLog] = useState([]);
    const [message, setMessage] = useState("");
    const socket = createSocket(sessionStorage.getItem("username") || "defaultUsername");

    useEffect(() => {
        return () => {
            closeSocket();
        }
    }, []);


    socket.onmessage = function(event) {
        setMessageLog([...messageLog, event.data]);
    }

    const handleSendMessage = () =>{
        sendMessage({action: "message", data: message});
        setMessage("");
    }

    return (
        <View>
            <Text>Chat</Text>
            <View>
                {
                    messageLog.map((message, index) => {
                        return <Text key={index}>{message}</Text>
                    })
                }
            </View>
            <TextInput style={styles.messageInput} type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <TouchableOpacity onPress={handleSendMessage}>
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    chat: {
       
    },
    messageLog: {
      
    },
    messageInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "yellow",
        borderStyle: "solid",
    }
});

export default Chat;