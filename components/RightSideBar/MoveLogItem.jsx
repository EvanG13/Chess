import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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
    console.log("HANDLING CLICK");
    console.log(fen);
    const json = fenToJSON(fen);
    setBoard({ ...board, board: json });
    setMoveIndex(index);
  };

  return (
    <Pressable onPress={handleClick} style={styles.moveLogItem}>
      <Text style={isActive ? styles.activeItemText : styles.itemText}>
        {san}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  moveLogItem: {
    margin: 3
  },
  activeItemText: {
    color: "gold"
  },
  itemText: {
    color: "white"
  }
});

export default MoveLogItem;
