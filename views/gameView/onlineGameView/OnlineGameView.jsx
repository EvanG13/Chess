import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import loaderGif from "../../../assets/appImages/loader.gif";

import styles from "./OnlineGameStyles.js";
import RightSideBar from "../../../components/RightSideBar/RightSideBar.jsx";
import Timer from "../../../components/Timer/Timer.jsx";
import TimeControls from "../../../types/TimeControls.js";
import Board from "../../../components/Board/Board.jsx";
import { useState, useEffect } from "react";
import getStartingBoard from "../../../components/Board/board.js";
import PlayerCard from "../../../components/Board/PlayerCard.jsx";
import createSocket from "../../../components/websocket.js";
import socketHandler from "../../../components/Board/socketHandler.js";
import { Modal } from "react-native";
import axiosInstance from "../../../components/axiosInstance.js";
import fenToJSON from "../../../components/Board/fenToJSON.js";

const OnlineGameView = ({ route, navigation }) => {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // true if white's turn, false if black's turn
  const [isStarted, setIsStarted] = useState(false);
  const [board, setBoard] = useState(getStartingBoard());
  const [blackSideBoard, setBlackSideBoard] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  const [moveList, setMoveList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);

  const { timeControl } = route.params;
  const [whiteTimer, setWhiteTimer] = useState(TimeControls[timeControl]);
  const [blackTimer, setBlackTimer] = useState(TimeControls[timeControl]);
  const [chatLog, setChatLog] = useState([]);

  const [hasWon, setHasWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [player1, setPlayer1] = useState({
    name: sessionStorage.getItem("username"),
    rating: 1000
  });
  const [player2, setPlayer2] = useState({ name: "opponent", rating: 1000 });
  let [socket, setSocket] = useState(null);

  
  //open the socket
  useEffect(() => {
    const setupSocket = async () => {
      if (!socket) {
        try {
          socket = await createSocket(sessionStorage.getItem("userId"));
          const setters = {
            setIsStarted,
            setHasWon,
            setShowWinner,
            setBoard,
            board,
            setBlackSideBoard,
            setIsWhiteTurn,
            isWhiteTurn,
            setIsWhite,
            isWhite,
            setChatLog,
            chatLog,
            setPlayer1,
            setPlayer2,
            moveList,
            setMoveList,
            setMoveIndex,
            setWhiteTimer,
            setBlackTimer
          };
          socket.onmessage = function (event) {
            socketHandler(event, setters);
          };
          setSocket(socket);
        } catch (error) {
          console.error("Error during joinGame:", error);
          return;
        }
      }
    };

    const setupGame = async () => {
      if (sessionStorage.getItem("userId") == undefined) {
        navigation.navigate("login");
        return;
      }
      await setupSocket();
      //check if user is already in game (like on a refresh)
      try {
        const gameStateResponse = await axiosInstance.get(`/gameState`);
        //user is in a game so set the game state
        const gameState = gameStateResponse.data;

        const boardJson = fenToJSON(gameState.gameStateAsFen);
        setBoard({ ...board, board: boardJson });

        const list = gameState.moveList;

        setMoveList([...list]);
        setMoveIndex(list.length - 1);
        setIsStarted(true);

        let bRemainingTime, wRemainingTime;
        if (gameState.players[0].isWhite) {
          bRemainingTime = gameState.players[1].remainingTime;
          wRemainingTime = gameState.players[0].remainingTime;
        } else {
          bRemainingTime = gameState.players[0].remainingTime;
          wRemainingTime = gameState.players[1].remainingTime;
        }
        setBlackTimer(bRemainingTime);
        setWhiteTimer(wRemainingTime);

        let players = gameState.players;
        if (players[0].username === sessionStorage.getItem("username")) {
          setIsWhite(players[0].isWhite);
          setBlackSideBoard(!players[0].isWhite);
          setPlayer2({ name: players[1].username, rating: players[1].rating });
        } else {
          setIsWhite(players[1].isWhite);
          setBlackSideBoard(!players[1].isWhite);
          setPlayer2({ name: players[0].username, rating: players[0].rating });
        }
        setIsWhiteTurn(gameState.isWhitesTurn);
      } catch (error) {
        //user is not in a game so try to find a game
        socket.sendMessage({
          action: "joinGame",
          timeControl,
          userId: sessionStorage.getItem("userId")
        });
      }
    };
    setupGame();
  }, []);

  //close the socket when component dismounts
  useEffect(() => {
    return () => {
      socket.close();
      socket = null;
    };
  }, []);

  return (
    <View style={styles.gameView}>
      <View style={styles.boardAndLogger}>
        <View style={styles.boardContainer}>
          {isStarted && (
            <View style={styles.playerAndTimer}>
              <Timer
                isWhite={!isWhite}
                isWhiteTurn={isWhiteTurn}
                timeRemaining={isWhite ? blackTimer : whiteTimer}
              />
              <PlayerCard player={player2} />
            </View>
          )}

          {isStarted ? null : (
            <View style={styles.loaderContainer}>
              <Image source={loaderGif} style={{ width: 120, height: 120 }} />
              <Text style={{ color: "white", margin: 10, fontSize: 30 }}>
                Searching For Game...
              </Text>
            </View>
          )}

          <Board
            {...{
              board,
              isWhiteTurn,
              setHasWon,
              setShowWinner,
              blackSideBoard,
              setBlackSideBoard,
              isWhite,
              socket
            }}
          />

          {isStarted && (
            <View style={styles.playerAndTimer}>
              <Timer
                isWhite={isWhite}
                isWhiteTurn={isWhiteTurn}
                timeRemaining={isWhite ? whiteTimer : blackTimer}
              />
              <PlayerCard player={player1} />
            </View>
          )}

          <Modal
            visible={showWinner}
            animationType="fade"
            onRequestClose={() => setShowWinner(false)}
            transparent
          >
            <SafeAreaView style={[styles.fill, styles.grey]}>
              <TouchableOpacity
                style={styles.darkGreen}
                onPress={() => {
                  setShowWinner(false);
                }}
              >
                <Text style={[styles.darkGreen, styles.rightAlign]}>X</Text>
              </TouchableOpacity>
              <Text style={styles.winnerText}>
                {isWhiteTurn ? "Black" : "White"} player has won!
              </Text>
              <TouchableOpacity
                style={styles.darkGreen}
                onPress={() => {
                  console.log("TODO implement rematch button");
                }}
              >
                <Text style={styles.buttonText}>Rematch</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.darkGreen}
                onPress={() => {
                  console.log("TODO implement new game button");
                }}
              >
                <Text style={styles.buttonText}>New Game</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>
        </View>
      </View>

      <RightSideBar
        socket={socket}
        board={board}
        setBoard={setBoard}
        moveIndex={moveIndex}
        setMoveIndex={setMoveIndex}
        moveList={moveList}
        chatLog={chatLog}
        setChatLog={setChatLog}
      />
    </View>
  );
};
export default OnlineGameView;
