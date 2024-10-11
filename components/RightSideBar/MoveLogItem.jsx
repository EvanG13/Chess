import react from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import fenToJSON from "../Board/fenToJSON";

const MoveLogItem = ({
  san,
  fen,
  isActive,
  board,
  setBoard,
  setMoveIndex,
  index
}) => {
  const handleClick = () => {
    const json = fenToJSON(fen);
    setBoard({ ...board, board: json });
    setMoveIndex(index);
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.moveLogItem}>
      <Text style={isActive ? styles.activeItemText : styles.itemText}>
        {san}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  moveLogItem: {
    margin: 3
  },
  activeItemText: {
    color: "blue"
  },
  itemText: {
    color: "black"
  }
});

export default MoveLogItem;
