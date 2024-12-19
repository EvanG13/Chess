import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./onlineGameScreenStyles.js";
import RightSideBar from "@/components/RightSideBar/RightSideBar.jsx";
import Board from "@/components/Board/Board.jsx";
import { useState, useEffect } from "react";
import getStartingBoard from "@/components/Board/board.js";
import PlayerCard from "@/components/Board/PlayerCard.jsx";
import createSocket from "@/services/socket/websocket.js";
import socketHandler from "@/services/socket/socketHandler.js";
import axiosInstance from "@/services/axios/axiosInstance.js";
import fenToJSON from "@/components/Board/fenToJSON.js";
import PromptModal from "@/components/PromptModal/PromptModal.jsx";
import Timer from "@/components/Timer/Timer";
import * as SecureStore from "expo-secure-store";
import GameOverModal from "./GameOverModal";

const OnlineGameScreen = ({ route, navigation }) => {
  //game state stuff
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState(getStartingBoard());

  const [blackSideBoard, setBlackSideBoard] = useState(false);
  const [isClientWhite, setIsClientWhite] = useState(false);

  //modal stuff
  const [promptType, setPromptType] = useState("");
  const [promptVisible, setPromptVisible] = useState(false);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  //move log stuff
  const [moveList, setMoveList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);

  //timers stuff
  const { timeControl } = route.params;
  const [whiteTimer, setWhiteTimer] = useState(timeControl.base);
  const [blackTimer, setBlackTimer] = useState(timeControl.base);

  //chat stuff
  const [chatLog, setChatLog] = useState([]);

  //player stuff
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({ name: "opponent", rating: 1000 });

  //socket stuff
  let [socket, setSocket] = useState(null);

  useEffect(() => {
    const playerData = async () => {
      const username = await SecureStore.getItemAsync("username");

      setPlayer1({ name: username, rating: 100 });
    };

    playerData();
  });

  //open the socket
  useEffect(() => {
    const setupSocket = async () => {
      if (!socket) {
        try {
          socket = await createSocket(await SecureStore.getItemAsync("userId"));
          const setters = {
            setIsStarted,
            setBoard,
            board,
            setBlackSideBoard,
            setIsWhiteTurn,
            isWhiteTurn,
            setIsWhite: setIsClientWhite,
            isWhite: isClientWhite,
            setChatLog,
            chatLog,
            setPlayer1,
            setPlayer2,
            moveList,
            setMoveList,
            setMoveIndex,
            setWhiteTimer,
            setBlackTimer,
            setGameOverModalVisible,
            setGameOverMessage,
            setPromptType,
            setPromptVisible,
            setIsGameOver
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
      if (!(await SecureStore.getItemAsync("userId"))) {
        navigation.navigate("login");
        return;
      }
      await setupSocket();
      //check if user is already in game (like on a refresh)
      try {
        const gameStateResponse = await axiosInstance.get("/gameState");
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
        if (
          players[0].username === (await SecureStore.getItemAsync("username"))
        ) {
          setIsClientWhite(players[0].isWhite);
          setBlackSideBoard(!players[0].isWhite);
          setPlayer2({ name: players[1].username, rating: players[1].rating });
        } else {
          setIsClientWhite(players[1].isWhite);
          setBlackSideBoard(!players[1].isWhite);
          setPlayer2({ name: players[0].username, rating: players[0].rating });
        }
        setIsWhiteTurn(gameState.isWhitesTurn);
      } catch (error) {
        //user is not in a game so try to find a game
        socket.sendMessage({
          action: "joinGame",
          timeControl,
          userId: await SecureStore.getItemAsync("userId")
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

  //listen for player timeouts
  useEffect(() => {
    const playerTimeout = async () => {
      if (
        (whiteTimer <= 0 && !isClientWhite) ||
        (blackTimer <= 0 && isClientWhite)
      ) {
        //white reports black player timeout and vice versa
        console.log("timout detected!!!");
        socket.sendMessage({
          action: "timeout",
          gameId: await SecureStore.getItemAsync("gameId")
        });
      }
    };

    playerTimeout();
  }, [whiteTimer, blackTimer]);

  return (
    <View style={styles.gameView}>
      <View style={styles.boardAndLogger}>
        <View style={styles.boardContainer}>
          {isStarted && (
            <View style={styles.playerAndTimer}>
              <Timer
                isWhite={!isClientWhite}
                isWhiteTurn={isWhiteTurn}
                timeRemaining={isClientWhite ? blackTimer : whiteTimer}
                setTimeRemaining={isClientWhite ? setBlackTimer : setWhiteTimer}
                isGameOver={isGameOver}
              />
              <PlayerCard player={player2} />
            </View>
          )}

          {isStarted ? null : (
            <View style={styles.loaderContainer}>
              <Image
                source={require("../../assets/appImages/loader.gif")}
                style={styles.gif}
              />
              <Text style={{ color: "white", margin: 10, fontSize: 30 }}>
                Searching For Game...
              </Text>
            </View>
          )}

          <Board
            {...{
              board,
              isWhiteTurn,
              blackSideBoard,
              setBlackSideBoard,
              isWhite: isClientWhite,
              socket,
              setIsWhiteTurn,
              setPromptType,
              setPromptVisible,
              isGameOver,
              canPlayMoves: true
            }}
          />

          {isStarted && (
            <View style={styles.playerAndTimer}>
              <Timer
                isWhite={isClientWhite}
                isWhiteTurn={isWhiteTurn}
                timeRemaining={isClientWhite ? whiteTimer : blackTimer}
                setTimeRemaining={isClientWhite ? setWhiteTimer : setBlackTimer}
                isGameOver={isGameOver}
              />
              <PlayerCard player={player1} />
            </View>
          )}
          <PromptModal
            isVisible={promptVisible}
            setIsVisible={setPromptVisible}
            type={promptType}
            socket={socket}
          />
          <GameOverModal
            isVisible={gameOverModalVisible}
            setIsVisible={setGameOverModalVisible}
            message={gameOverMessage}
            socket={socket}
            navigation={navigation}
            timeControl={timeControl}
          />
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
        setPromptType={setPromptType}
        setPromptVisible={setPromptVisible}
      />
    </View>
  );
};
export default OnlineGameScreen;
