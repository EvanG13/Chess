import { View, StyleSheet, Text } from "react-native";

const Move = ({
  notation,
  board,
  isWhiteTurn,
  setBoardAndIndex,
  isActive,
  index,
  setIsWhiteTurn
}) => {
  return (
    <View style={styles.move}>
      <Text
        style={isActive ? styles.isActive : styles.isNotActive}
        onPress={() => {
          setIsWhiteTurn(isWhiteTurn);
          setBoardAndIndex(board, index);
        }}
      >
        {notation}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  isActive: {
    color: "blue"
  },
  isNotActive: {
    color: "black"
  },
  move: {
    marginLeft: 3,
    marginRight: 3,
    height: "fit-content"
  }
});

export default Move;
