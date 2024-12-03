import { Pressable, ScrollView, View } from "react-native";
import React from "react";
import styles from "./reviewGameScreenStyles";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/FontAwesome";
import ReviewGameBar from "@/components/RightSideBar/ReviewGameBar";
import PlayerCard from "@/components/Board/PlayerCard";
import Board from "@/components/Board/Board";
import getStartingBoard from "@/components/Board/board";
import fenToJSON from "@/components/Board/fenToJSON";
import axiosInstance from "@/services/axios/axiosInstance";

const ReviewGameScreen = ({ route }) => {
  const [board, setBoard] = useState(getStartingBoard());

  // move log stuff
  const [moveList, setMoveList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);
  const [username, setUsername] = useState(null);
  const [blackSideBoard, setBlackSideBoard] = useState(false);

  let [topPlayerData, setTopPlayerData] = useState();
  let [bottomPlayerData, setBottomPlayerData] = useState();

  // Move list and Players names fetched from backend upon component render
  let gameInfo;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function getGameInfo() {
      const username = await SecureStore.getItemAsync("username");
      setUsername(username);

      const gameId = route.params.gameId;
      gameInfo = await axiosInstance.get(`/archivedGame/${gameId}`);
      setMoveList([...gameInfo.data.moveList]);
      setPlayers([...gameInfo.data.players]);

      const players = gameInfo.data.players;
      if (players[0].username === username) {
        setBottomPlayerData({
          username: players[0].username,
          rating: players[0].rating
        });
        setTopPlayerData({
          username: players[1].username,
          rating: players[1].rating
        });
        setBlackSideBoard(!players[0].isWhite);
      } else {
        setBottomPlayerData({
          username: players[1].username,
          rating: players[1].rating
        });
        setTopPlayerData({
          username: players[0].username,
          rating: players[0].rating
        });
        setBlackSideBoard(players[0].isWhite);
      }
    }
    getGameInfo();
  }, []);

  const increment = () => {
    if (moveIndex + 1 < moveList.length) {
      const newIndex = moveIndex + 1;
      setMoveIndex(newIndex);
      const json = fenToJSON(moveList[newIndex].fen);
      setBoard({ ...board, board: json });
    }
  };

  const incrementToEnd = () => {
    const newIndex = moveList.length - 1;
    setMoveIndex(newIndex);
    const json = fenToJSON(moveList[newIndex].fen);
    setBoard({ ...board, board: json });
  };

  const decrement = () => {
    if (moveIndex - 1 >= 0) {
      const newIndex = moveIndex - 1;
      setMoveIndex(newIndex);
      const json = fenToJSON(moveList[newIndex].fen);
      setBoard({ ...board, board: json });
    } else {
      decrementToBeginning();
    }
  };

  const decrementToBeginning = () => {
    const newIndex = -1;
    setMoveIndex(newIndex);
    const json = fenToJSON(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    setBoard({ ...board, board: json });
  };

  const flipBoard = () => {
    const flip = !blackSideBoard;
    const top = topPlayerData;
    const bottom = bottomPlayerData;

    setTopPlayerData(bottom);
    setBottomPlayerData(top);
    setBlackSideBoard(flip);
  };

  return (
    <View style={styles.reviewView}>
      <ScrollView style={styles.rowOne} horizontal={true}>
        <ReviewGameBar
          moveList={moveList}
          board={board}
          setBoard={setBoard}
          setMoveIndex={setMoveIndex}
          moveIndex={moveIndex}
        />
      </ScrollView>
      <View style={styles.rowTwo}>
        {players.length != 0 && (
          <PlayerCard
            player={{
              name: topPlayerData.username,
              rating: topPlayerData.rating
            }}
          />
        )}

        <Board
          {...{
            board,
            blackSideBoard,
            setBlackSideBoard
          }}
        />

        {players.length != 0 && (
          <PlayerCard
            player={{
              name: bottomPlayerData.username,
              rating: bottomPlayerData.rating
            }}
          />
        )}
      </View>
      <View style={styles.gameReviewFooter}>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={decrementToBeginning}>
            <Icon name="step-backward" size={25} color="white" />
          </Pressable>
          <Pressable onPress={decrement}>
            <Icon name="backward" size={25} color="white" />
          </Pressable>
          <Pressable onPress={flipBoard}>
            <Icon name="retweet" size={25} color="white" />
          </Pressable>
          <Pressable onPress={increment}>
            <Icon name="forward" size={25} color="white" />
          </Pressable>
          <Pressable onPress={incrementToEnd}>
            <Icon name="step-forward" size={25} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ReviewGameScreen;
