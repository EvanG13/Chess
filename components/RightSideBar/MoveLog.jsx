import react from "react";
import { StyleSheet, View, Text } from "react-native";
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
                san={move.san}
                fen={move.fen}
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
    marginTop: 10
  },
  log: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 3
  }
});

export default MoveLog;
