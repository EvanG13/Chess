
import { View} from "react-native";
import MoveLog from "./MoveLog";
import GameControls from "./GameControls";
import ChatContainer from "../Chat/ChatContainer";
import styles from "./RightSideBarStyles";

const RightSideBar = ({
  socket,
  board,
  setBoard,
  moveIndex,
  setMoveIndex,
  moveList,
  chatLog
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
      />
    </View>
  );
};

export default RightSideBar;
