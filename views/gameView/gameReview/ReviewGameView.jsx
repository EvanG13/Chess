import { View } from "react-native";
import styles from "./ReviewGameStyles.js";
import React from "react";
import Board from "../../../components/Board/Board.jsx";
import getStartingBoard from "../../../components/Board/board.js";
import PlayerCard from "../../../components/Board/PlayerCard.jsx";
import ReviewGameBar from "../../../components/RightSideBar/ReviewGameBar.jsx";

import axiosInstance from "../../../components/axiosInstance.js";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const ReviewGameView = ({ route }) => {
  const [board, setBoard] = useState(getStartingBoard());

  //move log stuff
  const [moveList, setMoveList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);
  const [username, setUsername] = useState(null);

  //Movelist and Players names fetched from backend upon component render
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
    }
    getGameInfo();
  }, []);

  useEffect(() => {
    //setMoveIndex(moveList.length-1);
    console.log(gameInfo);
  }, [moveList]);

  return (
    <View style={styles.reviewView}>
      <View style={styles.boardContainer}>
        {players.length != 0 && (
          <PlayerCard
            player={{
              name:
                players[0].username == username
                  ? players[1].username
                  : username,
              rating: 800
            }}
          />
        )}

        <Board
          {...{
            board
          }}
        />

        {players.length != 0 && (
          <PlayerCard player={{ name: username, rating: 800 }} />
        )}
      </View>

      <View style={styles.moveLog}>
        <ReviewGameBar
          moveList={moveList}
          board={board}
          setBoard={setBoard}
          setMoveIndex={setMoveIndex}
          moveIndex={moveIndex}
        />
      </View>
    </View>
  );
};

export default ReviewGameView;
