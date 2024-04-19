import { View, StyleSheet } from "react-native";
import Move from "./Move";
import { useState } from "react";

const Logger = ({ log, setBoard, setIsWhiteTurn }) => {
  const [moveIndex, setMoveIndex] = useState(0);

  const setBoardAndIndex = (newBoard, someIndex) => {
    // Deep clone the board array
    const clonedBoard = newBoard.map((row) => [...row]);
    setBoard(clonedBoard);
    setMoveIndex(someIndex);
  };
//TODO - set the moveIndex to the last move in the log when move is committed. 
//TODO - if a move is made and the move index is not at the end of the log, splice all moves after new move index.
  useEffect(() =>{
    setMoveIndex(log.length - 1);
  }, []) 

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
    backgroundColor: "white",
    width: "100%",
    height: "20%",
  }
});

export default Logger;
