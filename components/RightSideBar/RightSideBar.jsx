import react from "react";
import { View, StyleSheet } from "react-native";
import MoveLog from "./MoveLog";
import GameControls from "./GameControls";
import ChatContainer from "./ChatContainer";

const RightSideBar = ({
  socket,
  board,
  setBoard,
  moveIndex,
  setMoveIndex,
  moveList,
  chatLog,
  setChatLog
}) => {
  return (
    <View style={styles.rightSideBar}>
      <MoveLog
        socket={socket}
        board={board}
        setBoard={setBoard}
        moveIndex={moveIndex}
        setMoveIndex={setMoveIndex}
        moveList={moveList}
      />
      <GameControls socket={socket} />
      <ChatContainer
        chatLog={chatLog}
        socket={socket}
        setChatLog={setChatLog}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightSideBar: {
    flexDirection: "column",
    height: "100%",
    width: "20%",
    justifyContent: "space-between",
    backgroundColor: "black"
  }
});

export default RightSideBar;
