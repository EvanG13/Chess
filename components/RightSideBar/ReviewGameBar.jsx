import React from "react";

import { View } from "react-native";
import MoveLog from "../MoveLog/MoveLog";
import styles from "./RightSideBarStyles";

const ReviewGameBar = ({
  board,
  setBoard,
  moveIndex,
  setMoveIndex,
  moveList
}) => {
  console.log("MOVELIST IN BAR");
  console.log(moveList);

  let moves = [];
  for (let move of moveList) {
    moves.push({ ...move, board: move.fen, san: move.moveAsSan });
  }

  return (
    <View style={styles.rightSideBar}>
      <MoveLog
        board={board}
        setBoard={setBoard}
        moveIndex={moveIndex}
        setMoveIndex={setMoveIndex}
        moveList={moves}
      />
    </View>
  );
};

export default ReviewGameBar;
