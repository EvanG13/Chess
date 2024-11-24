import { View, StyleSheet } from "react-native";
import Move from "./Move";
import React from "react";

const Logger = ({ log, setBoard, setIsWhiteTurn, moveIndex, setMoveIndex }) => {
  const setBoardAndIndex = (newBoard, someIndex) => {
    // Deep clone the board array
    const clonedBoard = newBoard.map((row) => [...row]);
    setBoard(clonedBoard);
    setMoveIndex(someIndex);
  };
  //TODO - set the moveIndex to the last move in the log when move is committed.
  //TODO - if a move is made and the move index is not at the end of the log, splice all moves after new move index.

  return (
    <View style={styles.logger}>
      {log.map((move, index) => {
        return (
          <Move
            isActive={moveIndex === index}
            key={"move-" + index}
            index={index}
            notation={move.notation}
            board={move.board}
            isWhiteTurn={move.isWhiteTurn}
            setBoardAndIndex={setBoardAndIndex}
            setIsWhiteTurn={setIsWhiteTurn}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  logger: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: "50vw",
    height: "20%",
    overflow: "scroll"
  }
});

export default Logger;
