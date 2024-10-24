import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import { BoardSquare } from "../BoardSquare/BoardSquare";
import React, { useState, useEffect } from "react";
import getStartingBoard, { getNumberFromLetter } from "../Board/board.js";
import selectSquare from "./selectSquare.js";
import { Modal } from "react-native";
import { Switch } from "react-native-switch";

import axiosInstance from "../axiosInstance.js";
import createSocket from "../websocket.js";
import loaderGif from "../../assets/appImages/loader.gif";
import socketHandler from "./socketHandler.js";
import styles from "./BoardStyles.js";
import PlayerCard from "./PlayerCard.jsx";
import fenToJSON from "./fenToJSON.js";
import RightSideBar from "../RightSideBar/RightSideBar.jsx";
import Timer from "../Timer.jsx";
import TimeControls from "../../types/TimeControls.js";

export const Board = ({ route, navigation }) => {
  const { timeControl, isLocalGame } = route.params;
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // true if white's turn, false if black's turn
  const [isWhite, setIsWhite] = useState(false);
  const [board, setBoard] = useState(getStartingBoard()); // 8x8 array
  const [validMoves, setValidMoves] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState([]); // [number, number] must be a piece
  const [moveList, setMoveList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);
  const [isStarted, setIsStarted] = useState(false);
  const [whiteTimer, setWhiteTimer] = useState(TimeControls[timeControl]);
  const [blackTimer, setBlackTimer] = useState(TimeControls[timeControl]);
  const [chatLog, setChatLog] = useState([]);
  const [player1, setPlayer1] = useState({
    name: sessionStorage.getItem("username"),
    rating: 1000
  });
  const [player2, setPlayer2] = useState({ name: "opponent", rating: 1000 });
  const [kingSquare, setKingSquare] = useState({
    whiteKing: [7, 4],
    blackKing: [0, 4]
  });
  let [socket, setSocket] = useState(null);
  const [blackSideBoard, setBlackSideBoard] = useState(false);

  const letterRow = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numberCol = ["8. ", "7. ", "6. ", "5. ", "4. ", "3. ", "2. ", "1. "];

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

        console.log("user is in a game.");
        //user is in a game so set the game state
        const gameState = gameStateResponse.data;
        console.log(gameState);
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
        console.log(bRemainingTime, wRemainingTime);
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
        if (error.response.status !== 404) {
          console.error("Error during getGameState:", error);
          //TODO: handle this error -- the user can't get the game state regardless of if they are in a game or not
          return;
        }
        //user is not in a game so try to find a game
        console.log("user is not in a game.", error.response.status);
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
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, []);

  return (
    <View style={styles.gameView}>
      <View style={styles.boardAndLogger}>
        <Switch
          value={blackSideBoard}
          onValueChange={() => setBlackSideBoard(!blackSideBoard)}
          disabled={false}
          activeText={"White"}
          inActiveText={"Black"}
          circleSize={30}
          barHeight={30}
          circleBorderWidth={3}
          backgroundActive={"#696969"}
          backgroundInactive={"#696969"}
          circleActiveColor={"white"}
          circleInActiveColor={"#000000"}
        />

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
          {isStarted ? (
            <Text
              style={{ color: "white", fontSize: 25, marginBottom: 10 }}
            >{`${isWhiteTurn ? "white" : "black"} player to move.`}</Text>
          ) : (
            <View style={styles.loaderContainer}>
              <Image source={loaderGif} style={{ width: 120, height: 120 }} />
              <Text style={{ color: "white", margin: 10, fontSize: 30 }}>
                Searching For Game...
              </Text>
            </View>
          )}
          <View style={[styles.board, blackSideBoard && styles.flipped]}>
            {board.board.map((row, index) => {
              return (
                <View key={`row-${index}`} style={{ flexDirection: "row" }}>
                  {!blackSideBoard && (
                    <View style={{ marginRight: 10 }} key={`number-${index}`}>
                      <Text style={{ color: "white", fontSize: 13 }}>
                        {numberCol[index]}
                      </Text>
                    </View>
                  )}
                  {row.map((square, squareIndex) => {
                    return (
                      <BoardSquare
                        isHighlighted={validMoves.some(
                          (move) =>
                            move[0] === square.number &&
                            move[1] === getNumberFromLetter(square.letter)
                        )}
                        key={`square-${square.letter}-${square.number}`}
                        src={square.src}
                        letter={square.letter}
                        number={square.number}
                        piece={square.piece}
                        selectSquare={() => {
                          selectSquare(
                            square.number,
                            square.letter,
                            board,
                            selectedSquare,
                            setSelectedSquare,
                            isWhiteTurn,
                            validMoves,
                            setValidMoves,
                            kingSquare,
                            setKingSquare,
                            setHasWon,
                            setShowWinner,
                            socket,
                            isWhite
                          );
                        }}
                        isSelected={
                          selectedSquare[0] === square.number &&
                          selectedSquare[1] ===
                            getNumberFromLetter(square.letter)
                        }
                        flipped={blackSideBoard}
                      />
                    );
                  })}
                  {blackSideBoard && (
                    <View style={{ marginRight: 10 }} key={`number-${index}`}>
                      <Text
                        style={[
                          { color: "white", fontSize: 13 },
                          styles.flipped
                        ]}
                      >
                        {numberCol[index]}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.letters}>
            {blackSideBoard
              ? letterRow.toReversed().map((letter, i) => {
                  return (
                    <View
                      key={`letter-${i}`}
                      style={{ width: 45, marginLeft: 4 }}
                    >
                      <Text style={{ color: "white" }}>{letter}</Text>
                    </View>
                  );
                })
              : letterRow.map((letter, i) => {
                  return (
                    <View
                      key={`letter-${i}`}
                      style={{ width: 45, marginLeft: 4 }}
                    >
                      <Text style={{ color: "white" }}>{letter}</Text>
                    </View>
                  );
                })}
          </View>
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
