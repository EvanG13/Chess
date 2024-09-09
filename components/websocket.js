import { BACKEND_WEB_SOCKET_URL as url } from '@env';

let socket = null;

const createSocket = function(username) {
    if (!socket) {
        socket = new WebSocket(`${url}?username=${username}`);
        
        socket.onopen = function(event) {
            console.log('WebSocket is open now.');
        };
        
        socket.onmessage = function(event) {
            console.log('Message received: ' + event.data);
        };
        
        socket.onclose = function(event) {
            console.log('WebSocket is closed now.');
            socket = null; // Reset socket to null so it can be re-initialized
        };
    }
    return socket;
}

export const sendMessage = function(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open. Cannot send message.');
    }
}

export const closeSocket = function() {
    if (socket) {
        socket.close();
    }
}


export default createSocket;

