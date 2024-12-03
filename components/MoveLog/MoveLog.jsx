import React from "react";
import { StyleSheet, View } from "react-native";
import MoveLogItem from "./MoveLogItem";

const MoveLog = ({ moveList, board, setBoard, setMoveIndex, moveIndex }) => {
  return (
    <View style={styles.moveLog}>
      {moveList && (
        <View style={styles.log}>
          {moveList.map((move, index) => {
            return (
              <MoveLogItem
                board={board}
                setBoard={setBoard}
                setMoveIndex={setMoveIndex}
                fen={move.fen}
                san={move.san}
                isActive={index === moveIndex}
                index={index}
                key={`move-${index}`}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  moveLog: {
    height: "55%",
    width: "100%",
    backgroundColor: "black",
    marginTop: 10,
    color: "white"
  },
  log: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 3
  }
});

export default MoveLog;
