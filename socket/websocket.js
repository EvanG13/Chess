import { BACKEND_WEB_SOCKET_URL as url } from "@env";
console.log(url);
const createSocket = async function (userId) {
  console.log(url);
  return new Promise(function (resolve, reject) {
    let socket = new WebSocket(`${url}?userid=${userId}`);
    socket.onmessage = function (event) {
      console.log("Message received from server: " + event.data);
    };

    socket.onclose = function () {
      console.info("WebSocket is closed now.");
      socket = null; // Reset socket to null so it can be re-initialized
    };
    socket.sendMessage = function (message) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not open. Cannot send message.");
      }
    };
    socket.onopen = function () {
      console.info("WebSocket is open now.");
      resolve(socket);
    };
    socket.onerror = function (err) {
      console.error("WebSocket error: " + err);
      reject(err);
    };
  });
};

export default createSocket;
