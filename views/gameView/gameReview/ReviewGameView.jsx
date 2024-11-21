import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import styles from "./ReviewGameStyles.js";

import Board from "../../../components/Board/Board.jsx";
import getStartingBoard from "../../../components/Board/board.js";
import PlayerCard from "../../../components/Board/PlayerCard.jsx";
import ReviewGameBar from "../../../components/RightSideBar/ReviewGameBar.jsx";

import axiosInstance from "../../../components/axiosInstance.js";
import { useState, useEffect } from "react";

const ReviewGameView = ({ route }) => {
  const [board, setBoard] = useState(getStartingBoard());

  //modal stuff
  const [promptType, setPromptType] = useState("");
  const [promptVisible, setPromptVisible] = useState(false);

  //move log stuff
  const [moveList, setMoveList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(-1);

  //Movelist and Players names fetched from backend upon component render
  let gameInfo;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function getGameInfo() {
      const gameId = route.params.gameId;
      gameInfo = await axiosInstance.get(`/archivedGame/` + gameId);
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
                players[0].username == sessionStorage.getItem("username")
                  ? players[1].username
                  : sessionStorage.getItem("username"),
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
          <PlayerCard
            player={{ name: sessionStorage.getItem("username"), rating: 800 }}
          />
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
